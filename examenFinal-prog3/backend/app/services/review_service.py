from fastapi import HTTPException
from sqlalchemy.orm import Session
from .base_service import BaseService
from ..models.review import Review
from ..schemas.review_schema import ReviewCreate, ReviewUpdate
from .product_service import ProductService


class ReviewService(BaseService[Review, ReviewCreate, ReviewUpdate]):
    def __init__(self):
        super().__init__(Review)
        self.product_service = ProductService()

    def create(self, db: Session, schema: ReviewCreate):
        if not self.product_service.get(db, schema.product_id):
            raise HTTPException(status_code=404, detail="Product not found")
        return super().create(db, schema)

    def update(self, db: Session, id_key: int, schema: ReviewUpdate):
        if schema.product_id and not self.product_service.get(db, schema.product_id):
            raise HTTPException(status_code=404, detail="Product not found")
        return super().update(db, id_key, schema)
