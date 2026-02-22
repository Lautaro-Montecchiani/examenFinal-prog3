from typing import Optional
from pydantic import Field
from .base_schema import BaseSchema


class ProductCreate(BaseSchema):
    name: str = Field(..., min_length=1, max_length=200)
    price: float = Field(..., gt=0)
    stock: int = Field(0, ge=0)
    category_id: int = Field(..., gt=0)


class ProductUpdate(BaseSchema):
    name: Optional[str] = Field(None, min_length=1, max_length=200)
    price: Optional[float] = Field(None, gt=0)
    stock: Optional[int] = Field(None, ge=0)
    category_id: Optional[int] = Field(None, gt=0)


class ProductOut(ProductCreate):
    id_key: int

    class Config:
        from_attributes = True
