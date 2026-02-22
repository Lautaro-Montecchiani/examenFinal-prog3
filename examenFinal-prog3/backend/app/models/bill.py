from sqlalchemy import Column, Integer, String, Float, Date, Enum
from sqlalchemy.orm import relationship
from .base_model import BaseModel
from .enums import PaymentType


class Bill(BaseModel):
    __tablename__ = "bills"

    bill_number = Column(String, nullable=False, unique=True, index=True)
    discount = Column(Float, default=0)
    date = Column(Date, nullable=False)
    total = Column(Float, nullable=False)
    payment_type = Column(Enum(PaymentType), nullable=False)

    orders = relationship("Order", back_populates="bill", cascade="all, delete")
