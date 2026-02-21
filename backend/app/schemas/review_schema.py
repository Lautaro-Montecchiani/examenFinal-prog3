from pydantic import Field
from .base_schema import BaseSchema


class ReviewCreate(BaseSchema):
    rating: float = Field(..., ge=0, le=5)
    comment: str | None = None
    product_id: int = Field(..., gt=0)


class ReviewUpdate(BaseSchema):
    rating: float | None = Field(None, ge=0, le=5)
    comment: str | None = None
    product_id: int | None = Field(None, gt=0)


class ReviewOut(ReviewCreate):
    id_key: int

    class Config:
        from_attributes = True
