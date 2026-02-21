from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .base_model import BaseModel


class Address(BaseModel):
    __tablename__ = "addresses"

    street = Column(String, nullable=False)
    number = Column(String, nullable=True)
    city = Column(String, nullable=False)
    client_id = Column(Integer, ForeignKey("clients.id_key"), nullable=False)

    client = relationship("Client", back_populates="addresses")
