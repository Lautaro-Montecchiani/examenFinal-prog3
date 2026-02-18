from pydantic import Field, EmailStr
from .base_schema import BaseSchema


class ClientCreate(BaseSchema):
    name: str = Field(..., min_length=1, max_length=200)
    lastname: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    telephone: str | None = Field(None, pattern=r"^\+?[0-9\-\s]{6,20}$")


class ClientUpdate(BaseSchema):
    name: str | None = Field(None, min_length=1, max_length=200)
    lastname: str | None = Field(None, min_length=1, max_length=200)
    email: EmailStr | None = None
    telephone: str | None = Field(None, pattern=r"^\+?[0-9\-\s]{6,20}$")


class ClientOut(ClientCreate):
    id_key: int

    class Config:
        from_attributes = True
