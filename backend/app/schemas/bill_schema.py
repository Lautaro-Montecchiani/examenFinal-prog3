from typing import Optional
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
    bill_number: Optional[str] = Field(None, min_length=1, max_length=100)
    discount: Optional[float] = Field(None, ge=0)
    date: Optional[date] = None
    total: Optional[float] = Field(None, ge=0)
    payment_type: Optional[PaymentType] = None


class BillOut(BillCreate):
    id_key: int

    class Config:
        from_attributes = True
