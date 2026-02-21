from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..config.database import get_db
from ..schemas.client_schema import ClientCreate, ClientUpdate, ClientOut
from ..services.client_service import ClientService

router = APIRouter(prefix="/clients", tags=["clients"])
service = ClientService()


@router.get("", response_model=list[ClientOut])
def list_clients(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return service.list(db, skip, limit)


@router.get("/{client_id}", response_model=ClientOut)
def get_client(client_id: int, db: Session = Depends(get_db)):
    client = service.get(db, client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client


@router.post("", response_model=ClientOut, status_code=201)
def create_client(payload: ClientCreate, db: Session = Depends(get_db)):
    return service.create(db, payload)


@router.put("/{client_id}", response_model=ClientOut)
def update_client(client_id: int, payload: ClientUpdate, db: Session = Depends(get_db)):
    client = service.update(db, client_id, payload)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client


@router.delete("/{client_id}", status_code=204)
def delete_client(client_id: int, db: Session = Depends(get_db)):
    ok = service.delete(db, client_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Client not found")
    return None
