from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..config.database import get_db
from ..schemas.review_schema import ReviewCreate, ReviewUpdate, ReviewOut
from ..services.review_service import ReviewService

router = APIRouter(prefix="/reviews", tags=["reviews"])
service = ReviewService()


@router.get("", response_model=list[ReviewOut])
def list_reviews(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return service.list(db, skip, limit)


@router.get("/{review_id}", response_model=ReviewOut)
def get_review(review_id: int, db: Session = Depends(get_db)):
    review = service.get(db, review_id)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    return review


@router.post("", response_model=ReviewOut, status_code=201)
def create_review(payload: ReviewCreate, db: Session = Depends(get_db)):
    return service.create(db, payload)


@router.put("/{review_id}", response_model=ReviewOut)
def update_review(review_id: int, payload: ReviewUpdate, db: Session = Depends(get_db)):
    review = service.update(db, review_id, payload)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    return review


@router.delete("/{review_id}", status_code=204)
def delete_review(review_id: int, db: Session = Depends(get_db)):
    ok = service.delete(db, review_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Review not found")
    return None
