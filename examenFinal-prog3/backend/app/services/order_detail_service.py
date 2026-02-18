from fastapi import HTTPException
from sqlalchemy.orm import Session
from .base_service import BaseService
from ..models.order_detail import OrderDetail
from ..models.product import Product
from ..schemas.order_detail_schema import OrderDetailCreate, OrderDetailUpdate
from .order_service import OrderService
from .product_service import ProductService


class OrderDetailService(BaseService[OrderDetail, OrderDetailCreate, OrderDetailUpdate]):
    def __init__(self):
        super().__init__(OrderDetail)
        self.order_service = OrderService()
        self.product_service = ProductService()

    def _ensure_fk(self, db: Session, order_id: int, product_id: int) -> Product:
        if not self.order_service.get(db, order_id):
            raise HTTPException(status_code=404, detail="Order not found")
        product = self.product_service.get(db, product_id)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        return product

    def create(self, db: Session, schema: OrderDetailCreate):
        product = self._ensure_fk(db, schema.order_id, schema.product_id)
        if product.stock < schema.quantity:
            raise HTTPException(status_code=400, detail="Insufficient stock")
        if product.price != schema.price:
            raise HTTPException(status_code=400, detail="Price mismatch")
        product.stock -= schema.quantity
        db.add(product)
        db.commit()
        db.refresh(product)
        return super().create(db, schema)

    def update(self, db: Session, id_key: int, schema: OrderDetailUpdate):
        detail = self.get(db, id_key)
        if not detail:
            return None
        product = self._ensure_fk(db, detail.order_id if schema.order_id is None else schema.order_id, detail.product_id if schema.product_id is None else schema.product_id)
        if schema.quantity is not None:
            delta = schema.quantity - detail.quantity
            if product.stock < delta:
                raise HTTPException(status_code=400, detail="Insufficient stock")
            product.stock -= delta
        if schema.price is not None and schema.price != product.price:
            raise HTTPException(status_code=400, detail="Price mismatch")
        db.add(product)
        db.commit()
        db.refresh(product)
        return super().update(db, id_key, schema)

    def delete(self, db: Session, id_key: int):
        detail = self.get(db, id_key)
        if not detail:
            return False
        product = self.product_service.get(db, detail.product_id)
        if product:
            product.stock += detail.quantity
            db.add(product)
        db.delete(detail)
        db.commit()
        return True
