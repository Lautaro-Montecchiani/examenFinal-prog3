from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..config.database import get_db
from ..schemas.bill_schema import BillCreate, BillUpdate, BillOut
from ..services.bill_service import BillService

router = APIRouter(prefix="/bills", tags=["bills"])
service = BillService()


@router.get("", response_model=list[BillOut])
def list_bills(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return service.list(db, skip, limit)


@router.get("/{bill_id}", response_model=BillOut)
def get_bill(bill_id: int, db: Session = Depends(get_db)):
    bill = service.get(db, bill_id)
    if not bill:
        raise HTTPException(status_code=404, detail="Bill not found")
    return bill


@router.post("", response_model=BillOut, status_code=201)
def create_bill(payload: BillCreate, db: Session = Depends(get_db)):
    return service.create(db, payload)


@router.put("/{bill_id}", response_model=BillOut)
def update_bill(bill_id: int, payload: BillUpdate, db: Session = Depends(get_db)):
    bill = service.update(db, bill_id, payload)
    if not bill:
        raise HTTPException(status_code=404, detail="Bill not found")
    return bill


@router.delete("/{bill_id}", status_code=204)
def delete_bill(bill_id: int, db: Session = Depends(get_db)):
    ok = service.delete(db, bill_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Bill not found")
    return None
