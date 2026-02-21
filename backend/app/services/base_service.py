from typing import Generic, TypeVar, Type
from sqlalchemy.orm import Session

ModelType = TypeVar("ModelType")
SchemaCreateType = TypeVar("SchemaCreateType")
SchemaUpdateType = TypeVar("SchemaUpdateType")


class BaseService(Generic[ModelType, SchemaCreateType, SchemaUpdateType]):
    def __init__(self, model: Type[ModelType]):
        self.model = model

    def list(self, db: Session, skip: int = 0, limit: int = 100):
        return db.query(self.model).offset(skip).limit(limit).all()

    def get(self, db: Session, id_key: int):
        return db.query(self.model).filter(self.model.id_key == id_key).first()

    def create(self, db: Session, schema: SchemaCreateType):
        instance = self.model(**schema.model_dump())
        db.add(instance)
        db.commit()
        db.refresh(instance)
        return instance

    def update(self, db: Session, id_key: int, schema: SchemaUpdateType):
        instance = self.get(db, id_key)
        if not instance:
            return None
        for field, value in schema.model_dump(exclude_unset=True).items():
            setattr(instance, field, value)
        db.commit()
        db.refresh(instance)
        return instance

    def delete(self, db: Session, id_key: int):
        instance = self.get(db, id_key)
        if not instance:
            return False
        db.delete(instance)
        db.commit()
        return True
