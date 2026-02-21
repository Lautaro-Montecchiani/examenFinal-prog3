from datetime import datetime
from sqlalchemy import Column, Integer, DateTime
from ..config.database import Base


class BaseModel(Base):
    __abstract__ = True
    id_key = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
