from pydantic import Field
from .base_schema import BaseSchema


class OrderDetailCreate(BaseSchema):
    quantity: int = Field(..., gt=0)
    price: float = Field(..., gt=0)
    order_id: int = Field(..., gt=0)
    product_id: int = Field(..., gt=0)


class OrderDetailUpdate(BaseSchema):
    quantity: int | None = Field(None, gt=0)
    price: float | None = Field(None, gt=0)
    order_id: int | None = Field(None, gt=0)
    product_id: int | None = Field(None, gt=0)


class OrderDetailOut(OrderDetailCreate):
    id_key: int

    class Config:
        from_attributes = True
