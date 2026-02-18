from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from .base_model import BaseModel


class OrderDetail(BaseModel):
    __tablename__ = "order_details"

    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    order_id = Column(Integer, ForeignKey("orders.id_key"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id_key"), nullable=False)

    order = relationship("Order", back_populates="order_details")
    product = relationship("Product", back_populates="order_details")
