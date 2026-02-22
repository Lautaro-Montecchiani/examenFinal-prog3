from pydantic import Field
from .base_schema import BaseSchema


class ProductCreate(BaseSchema):
    name: str = Field(..., min_length=1, max_length=200)
    price: float = Field(..., gt=0)
    stock: int = Field(0, ge=0)
    category_id: int = Field(..., gt=0)


class ProductUpdate(BaseSchema):
    name: str | None = Field(None, min_length=1, max_length=200)
    price: float | None = Field(None, gt=0)
    stock: int | None = Field(None, ge=0)
    category_id: int | None = Field(None, gt=0)


class ProductOut(ProductCreate):
    id_key: int

    class Config:
        from_attributes = True
