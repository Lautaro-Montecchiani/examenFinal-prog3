from pydantic import Field
from .base_schema import BaseSchema


class AddressCreate(BaseSchema):
    street: str = Field(..., min_length=1, max_length=200)
    number: str | None = Field(None, max_length=50)
    city: str = Field(..., min_length=1, max_length=200)
    client_id: int = Field(..., gt=0)


class AddressUpdate(BaseSchema):
    street: str | None = Field(None, min_length=1, max_length=200)
    number: str | None = Field(None, max_length=50)
    city: str | None = Field(None, min_length=1, max_length=200)
    client_id: int | None = Field(None, gt=0)


class AddressOut(AddressCreate):
    id_key: int

    class Config:
        from_attributes = True
