from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..config.database import get_db
from ..schemas.address_schema import AddressCreate, AddressUpdate, AddressOut
from ..services.address_service import AddressService

router = APIRouter(prefix="/addresses", tags=["addresses"])
service = AddressService()


@router.get("", response_model=list[AddressOut])
def list_addresses(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return service.list(db, skip, limit)


@router.get("/{address_id}", response_model=AddressOut)
def get_address(address_id: int, db: Session = Depends(get_db)):
    address = service.get(db, address_id)
    if not address:
        raise HTTPException(status_code=404, detail="Address not found")
    return address


@router.post("", response_model=AddressOut, status_code=201)
def create_address(payload: AddressCreate, db: Session = Depends(get_db)):
    return service.create(db, payload)


@router.put("/{address_id}", response_model=AddressOut)
def update_address(address_id: int, payload: AddressUpdate, db: Session = Depends(get_db)):
    address = service.update(db, address_id, payload)
    if not address:
        raise HTTPException(status_code=404, detail="Address not found")
    return address


@router.delete("/{address_id}", status_code=204)
def delete_address(address_id: int, db: Session = Depends(get_db)):
    ok = service.delete(db, address_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Address not found")
    return None
