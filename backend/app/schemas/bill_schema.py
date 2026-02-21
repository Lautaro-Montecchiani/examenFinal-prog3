from datetime import date
from pydantic import Field
from .base_schema import BaseSchema
from ..models.enums import PaymentType


class BillCreate(BaseSchema):
    bill_number: str = Field(..., min_length=1, max_length=100)
    discount: float = Field(0, ge=0)
    date: date
    total: float = Field(..., ge=0)
    payment_type: PaymentType


class BillUpdate(BaseSchema):
    bill_number: str | None = Field(None, min_length=1, max_length=100)
    discount: float | None = Field(None, ge=0)
    date: date | None = None
    total: float | None = Field(None, ge=0)
    payment_type: PaymentType | None = None


class BillOut(BillCreate):
    id_key: int

    class Config:
        from_attributes = True
