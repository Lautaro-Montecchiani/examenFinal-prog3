from datetime import datetime
from pydantic import Field
from .base_schema import BaseSchema
from ..models.enums import DeliveryMethod, OrderStatus


class OrderCreate(BaseSchema):
    date: datetime
    total: float = Field(..., ge=0)
    delivery_method: DeliveryMethod
    status: OrderStatus
    client_id: int = Field(..., gt=0)
    bill_id: int = Field(..., gt=0)


class OrderUpdate(BaseSchema):
    date: datetime | None = None
    total: float | None = Field(None, ge=0)
    delivery_method: DeliveryMethod | None = None
    status: OrderStatus | None = None
    client_id: int | None = Field(None, gt=0)
    bill_id: int | None = Field(None, gt=0)


class OrderOut(OrderCreate):
    id_key: int

    class Config:
        from_attributes = True
