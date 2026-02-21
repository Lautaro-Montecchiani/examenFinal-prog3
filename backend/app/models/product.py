from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from .base_model import BaseModel


class Product(BaseModel):
    __tablename__ = "products"

    name = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    stock = Column(Integer, nullable=False, default=0)
    category_id = Column(Integer, ForeignKey("categories.id_key"), nullable=False)

    category = relationship("Category", back_populates="products")
    order_details = relationship("OrderDetail", back_populates="product", cascade="all, delete")
    reviews = relationship("Review", back_populates="product", cascade="all, delete")
