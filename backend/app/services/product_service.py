from sqlalchemy.orm import Session
from fastapi import HTTPException
from .base_service import BaseService
from ..models.product import Product
from ..schemas.product_schema import ProductCreate, ProductUpdate
from .category_service import CategoryService
from .cache_service import CacheService


class ProductService(BaseService[Product, ProductCreate, ProductUpdate]):
    def __init__(self):
        super().__init__(Product)
        self.category_service = CategoryService()
        self.cache = CacheService()
        self.cache_enabled = self.cache.enabled
        self.list_key_prefix = "products:list"
        self.item_key_prefix = "products:item"

    def _serialize(self, product: Product) -> dict:
        return {
            "id_key": product.id_key,
            "name": product.name,
            "price": product.price,
            "stock": product.stock,
            "category_id": product.category_id,
            "created_at": product.created_at,
            "updated_at": product.updated_at,
        }

    def _list_key(self, skip: int, limit: int) -> str:
        return f"{self.list_key_prefix}:{skip}:{limit}"

    def _item_key(self, product_id: int) -> str:
        return f"{self.item_key_prefix}:{product_id}"

    def _invalidate_cache(self, product_id: int | None = None):
        if not self.cache_enabled:
            return
        self.cache.delete_pattern(f"{self.list_key_prefix}*")
        if product_id:
            self.cache.delete(self._item_key(product_id))

    def list(self, db: Session, skip: int = 0, limit: int = 100):
        cache_key = self._list_key(skip, limit)
        if self.cache_enabled:
            cached = self.cache.get(cache_key)
            if cached is not None:
                return cached

        products = super().list(db, skip, limit)
        if self.cache_enabled:
            self.cache.set(cache_key, [self._serialize(p) for p in products])
        return products

    def create(self, db: Session, schema: ProductCreate):
        if not self.category_service.ensure_exists(db, schema.category_id):
            raise HTTPException(status_code=404, detail="Category not found")
        product = super().create(db, schema)
        self._invalidate_cache(product.id_key)
        return product

    def update(self, db: Session, id_key: int, schema: ProductUpdate):
        if schema.category_id and not self.category_service.ensure_exists(db, schema.category_id):
            raise HTTPException(status_code=404, detail="Category not found")
        product = super().update(db, id_key, schema)
        if product:
            self._invalidate_cache(product.id_key)
        return product

    def get(self, db: Session, id_key: int):
        cache_key = self._item_key(id_key)
        if self.cache_enabled:
            cached = self.cache.get(cache_key)
            if cached is not None:
                return cached

        product = super().get(db, id_key)
        if product and self.cache_enabled:
            self.cache.set(cache_key, self._serialize(product))
        return product

    def delete(self, db: Session, id_key: int):
        deleted = super().delete(db, id_key)
        if deleted:
            self._invalidate_cache(id_key)
        return deleted
