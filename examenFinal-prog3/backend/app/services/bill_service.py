from fastapi import HTTPException
from sqlalchemy.orm import Session
from .base_service import BaseService
from ..models.bill import Bill
from ..schemas.bill_schema import BillCreate, BillUpdate


class BillService(BaseService[Bill, BillCreate, BillUpdate]):
    def __init__(self):
        super().__init__(Bill)

    def create(self, db: Session, schema: BillCreate):
        existing = db.query(Bill).filter(Bill.bill_number == schema.bill_number).first()
        if existing:
            raise HTTPException(status_code=400, detail="Bill number already exists")
        return super().create(db, schema)

    def update(self, db: Session, id_key: int, schema: BillUpdate):
        if schema.bill_number:
            existing = db.query(Bill).filter(Bill.bill_number == schema.bill_number, Bill.id_key != id_key).first()
            if existing:
                raise HTTPException(status_code=400, detail="Bill number already exists")
        return super().update(db, id_key, schema)
