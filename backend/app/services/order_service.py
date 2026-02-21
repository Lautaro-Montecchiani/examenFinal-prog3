from fastapi import HTTPException
from sqlalchemy.orm import Session
from .base_service import BaseService
from ..models.order import Order
from ..schemas.order_schema import OrderCreate, OrderUpdate
from .client_service import ClientService
from .bill_service import BillService


class OrderService(BaseService[Order, OrderCreate, OrderUpdate]):
    def __init__(self):
        super().__init__(Order)
        self.client_service = ClientService()
        self.bill_service = BillService()

    def create(self, db: Session, schema: OrderCreate):
        if not self.client_service.get(db, schema.client_id):
            raise HTTPException(status_code=404, detail="Client not found")
        if not self.bill_service.get(db, schema.bill_id):
            raise HTTPException(status_code=404, detail="Bill not found")
        return super().create(db, schema)

    def update(self, db: Session, id_key: int, schema: OrderUpdate):
        if schema.client_id and not self.client_service.get(db, schema.client_id):
            raise HTTPException(status_code=404, detail="Client not found")
        if schema.bill_id and not self.bill_service.get(db, schema.bill_id):
            raise HTTPException(status_code=404, detail="Bill not found")
        return super().update(db, id_key, schema)
