from sqlalchemy.orm import Session
from .base_service import BaseService
from ..models.category import Category
from ..schemas.category_schema import CategoryCreate, CategoryUpdate
from .cache_service import CacheService


class CategoryService(BaseService[Category, CategoryCreate, CategoryUpdate]):
    def __init__(self):
        super().__init__(Category)
        self.cache = CacheService()
        self.cache_enabled = self.cache.enabled
        self.list_key_prefix = "categories:list"
        self.item_key_prefix = "categories:item"

    def _serialize(self, category: Category) -> dict:
        return {
            "id_key": category.id_key,
            "name": category.name,
            "created_at": category.created_at,
            "updated_at": category.updated_at,
        }

    def _list_key(self, skip: int, limit: int) -> str:
        return f"{self.list_key_prefix}:{skip}:{limit}"

    def _item_key(self, category_id: int) -> str:
        return f"{self.item_key_prefix}:{category_id}"

    def _invalidate_cache(self, category_id: int | None = None):
        if not self.cache_enabled:
            return
        self.cache.delete_pattern(f"{self.list_key_prefix}*")
        if category_id:
            self.cache.delete(self._item_key(category_id))

    def list(self, db: Session, skip: int = 0, limit: int = 100):
        cache_key = self._list_key(skip, limit)
        if self.cache_enabled:
            cached = self.cache.get(cache_key)
            if cached is not None:
                return cached

        categories = super().list(db, skip, limit)
        if self.cache_enabled:
            self.cache.set(cache_key, [self._serialize(c) for c in categories])
        return categories

    def ensure_exists(self, db: Session, category_id: int) -> Category | None:
        return self.get(db, category_id)

    def get(self, db: Session, id_key: int):
        cache_key = self._item_key(id_key)
        if self.cache_enabled:
            cached = self.cache.get(cache_key)
            if cached is not None:
                return cached

        category = super().get(db, id_key)
        if category and self.cache_enabled:
            self.cache.set(cache_key, self._serialize(category))
        return category

    def create(self, db: Session, schema: CategoryCreate):
        category = super().create(db, schema)
        self._invalidate_cache(category.id_key)
        return category

    def update(self, db: Session, id_key: int, schema: CategoryUpdate):
        category = super().update(db, id_key, schema)
        if category:
            self._invalidate_cache(category.id_key)
        return category

    def delete(self, db: Session, id_key: int):
        deleted = super().delete(db, id_key)
        if deleted:
            self._invalidate_cache(id_key)
        return deleted
