from datetime import datetime
from pydantic import BaseModel


class BaseSchema(BaseModel):
    id_key: int | None = None
    created_at: datetime | None = None
    updated_at: datetime | None = None

    class Config:
        from_attributes = True
