from typing import Optional
from pydantic import Field
from .base_schema import BaseSchema


class AddressCreate(BaseSchema):
    street: str = Field(..., min_length=1, max_length=200)
    number: Optional[str] = Field(None, max_length=50)
    city: str = Field(..., min_length=1, max_length=200)
    client_id: int = Field(..., gt=0)


class AddressUpdate(BaseSchema):
    street: Optional[str] = Field(None, min_length=1, max_length=200)
    number: Optional[str] = Field(None, max_length=50)
    city: Optional[str] = Field(None, min_length=1, max_length=200)
    client_id: Optional[int] = Field(None, gt=0)


class AddressOut(AddressCreate):
    id_key: int

    class Config:
        from_attributes = True
