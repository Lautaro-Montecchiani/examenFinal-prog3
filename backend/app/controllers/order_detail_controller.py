from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..config.database import get_db
from ..schemas.order_detail_schema import OrderDetailCreate, OrderDetailUpdate, OrderDetailOut
from ..services.order_detail_service import OrderDetailService

router = APIRouter(prefix="/order_details", tags=["order_details"])
service = OrderDetailService()


@router.get("", response_model=list[OrderDetailOut])
def list_order_details(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return service.list(db, skip, limit)


@router.get("/{detail_id}", response_model=OrderDetailOut)
def get_order_detail(detail_id: int, db: Session = Depends(get_db)):
    detail = service.get(db, detail_id)
    if not detail:
        raise HTTPException(status_code=404, detail="Order detail not found")
    return detail


@router.post("", response_model=OrderDetailOut, status_code=201)
def create_order_detail(payload: OrderDetailCreate, db: Session = Depends(get_db)):
    return service.create(db, payload)


@router.put("/{detail_id}", response_model=OrderDetailOut)
def update_order_detail(detail_id: int, payload: OrderDetailUpdate, db: Session = Depends(get_db)):
    detail = service.update(db, detail_id, payload)
    if not detail:
        raise HTTPException(status_code=404, detail="Order detail not found")
    return detail


@router.delete("/{detail_id}", status_code=204)
def delete_order_detail(detail_id: int, db: Session = Depends(get_db)):
    ok = service.delete(db, detail_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Order detail not found")
    return None
