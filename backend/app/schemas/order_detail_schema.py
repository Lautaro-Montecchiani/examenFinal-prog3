from typing import Optional
from pydantic import Field
from .base_schema import BaseSchema


class OrderDetailCreate(BaseSchema):
    quantity: int = Field(..., gt=0)
    price: float = Field(..., gt=0)
    order_id: int = Field(..., gt=0)
    product_id: int = Field(..., gt=0)


class OrderDetailUpdate(BaseSchema):
    quantity: Optional[int] = Field(None, gt=0)
    price: Optional[float] = Field(None, gt=0)
    order_id: Optional[int] = Field(None, gt=0)
    product_id: Optional[int] = Field(None, gt=0)


class OrderDetailOut(OrderDetailCreate):
    id_key: int

    class Config:
        from_attributes = True
