from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .base_model import BaseModel


class Client(BaseModel):
    __tablename__ = "clients"

    name = Column(String, nullable=False)
    lastname = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True, index=True)
    telephone = Column(String, nullable=True)

    addresses = relationship("Address", back_populates="client", cascade="all, delete")
    orders = relationship("Order", back_populates="client", cascade="all, delete")
