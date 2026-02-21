from fastapi import HTTPException
from sqlalchemy.orm import Session
from .base_service import BaseService
from ..models.address import Address
from ..schemas.address_schema import AddressCreate, AddressUpdate
from .client_service import ClientService


class AddressService(BaseService[Address, AddressCreate, AddressUpdate]):
    def __init__(self):
        super().__init__(Address)
        self.client_service = ClientService()

    def create(self, db: Session, schema: AddressCreate):
        if not self.client_service.get(db, schema.client_id):
            raise HTTPException(status_code=404, detail="Client not found")
        return super().create(db, schema)

    def update(self, db: Session, id_key: int, schema: AddressUpdate):
        if schema.client_id and not self.client_service.get(db, schema.client_id):
            raise HTTPException(status_code=404, detail="Client not found")
        return super().update(db, id_key, schema)
