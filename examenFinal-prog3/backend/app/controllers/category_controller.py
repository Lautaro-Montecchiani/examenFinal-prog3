from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..config.database import get_db
from ..schemas.category_schema import CategoryCreate, CategoryUpdate, CategoryOut
from ..services.category_service import CategoryService

router = APIRouter(prefix="/categories", tags=["categories"])
service = CategoryService()


@router.get("", response_model=list[CategoryOut])
def list_categories(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return service.list(db, skip, limit)


@router.get("/{category_id}", response_model=CategoryOut)
def get_category(category_id: int, db: Session = Depends(get_db)):
    category = service.get(db, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category


@router.post("", response_model=CategoryOut, status_code=201)
def create_category(payload: CategoryCreate, db: Session = Depends(get_db)):
    return service.create(db, payload)


@router.put("/{category_id}", response_model=CategoryOut)
def update_category(category_id: int, payload: CategoryUpdate, db: Session = Depends(get_db)):
    category = service.update(db, category_id, payload)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category


@router.delete("/{category_id}", status_code=204)
def delete_category(category_id: int, db: Session = Depends(get_db)):
    ok = service.delete(db, category_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Category not found")
    return None
