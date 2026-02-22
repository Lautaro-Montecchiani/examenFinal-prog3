from typing import Optional
from pydantic import Field
from .base_schema import BaseSchema


class ReviewCreate(BaseSchema):
    rating: float = Field(..., ge=0, le=5)
    comment: Optional[str] = None
    product_id: int = Field(..., gt=0)


class ReviewUpdate(BaseSchema):
    rating: Optional[float] = Field(None, ge=0, le=5)
    comment: Optional[str] = None
    product_id: Optional[int] = Field(None, gt=0)


class ReviewOut(ReviewCreate):
    id_key: int

    class Config:
        from_attributes = True
