from sqlalchemy import Column, Integer, Float, Text, ForeignKey
from sqlalchemy.orm import relationship
from .base_model import BaseModel


class Review(BaseModel):
    __tablename__ = "reviews"

    rating = Column(Float, nullable=False)
    comment = Column(Text, nullable=True)
    product_id = Column(Integer, ForeignKey("products.id_key"), nullable=False)

    product = relationship("Product", back_populates="reviews")
