from typing import Optional
from datetime import datetime
from pydantic import BaseModel


class BaseSchema(BaseModel):
    id_key: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
