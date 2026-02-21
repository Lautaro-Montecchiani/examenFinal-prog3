from sqlalchemy import Column, Integer, Float, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship
from .base_model import BaseModel
from .enums import DeliveryMethod, OrderStatus


class Order(BaseModel):
    __tablename__ = "orders"

    date = Column(DateTime, nullable=False)
    total = Column(Float, nullable=False)
    delivery_method = Column(Enum(DeliveryMethod), nullable=False)
    status = Column(Enum(OrderStatus), nullable=False)
    client_id = Column(Integer, ForeignKey("clients.id_key"), nullable=False)
    bill_id = Column(Integer, ForeignKey("bills.id_key"), nullable=False)

    client = relationship("Client", back_populates="orders")
    bill = relationship("Bill", back_populates="orders")
    order_details = relationship("OrderDetail", back_populates="order", cascade="all, delete")
