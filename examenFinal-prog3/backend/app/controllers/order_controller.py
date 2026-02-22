from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..config.database import get_db
from ..schemas.order_schema import OrderCreate, OrderUpdate, OrderOut
from ..services.order_service import OrderService

router = APIRouter(prefix="/orders", tags=["orders"])
service = OrderService()


@router.get("", response_model=list[OrderOut])
def list_orders(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return service.list(db, skip, limit)


@router.get("/{order_id}", response_model=OrderOut)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = service.get(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.post("", response_model=OrderOut, status_code=201)
def create_order(payload: OrderCreate, db: Session = Depends(get_db)):
    return service.create(db, payload)


@router.put("/{order_id}", response_model=OrderOut)
def update_order(order_id: int, payload: OrderUpdate, db: Session = Depends(get_db)):
    order = service.update(db, order_id, payload)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.delete("/{order_id}", status_code=204)
def delete_order(order_id: int, db: Session = Depends(get_db)):
    ok = service.delete(db, order_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Order not found")
    return None
