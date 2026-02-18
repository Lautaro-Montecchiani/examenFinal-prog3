from pydantic import Field
from .base_schema import BaseSchema


class CategoryCreate(BaseSchema):
    name: str = Field(..., min_length=1, max_length=200)


class CategoryUpdate(BaseSchema):
    name: str | None = Field(None, min_length=1, max_length=200)


class CategoryOut(CategoryCreate):
    id_key: int

    class Config:
        from_attributes = True
