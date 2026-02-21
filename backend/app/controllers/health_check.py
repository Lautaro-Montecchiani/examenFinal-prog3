import time
from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session
from ..config.database import get_db
from ..config.redis_config import get_redis

router = APIRouter(prefix="", tags=["health"])


@router.get("/health_check")
def health_check(db: Session = Depends(get_db)):
    start = time.perf_counter()
    db.execute(text("SELECT 1"))
    db_latency_ms = (time.perf_counter() - start) * 1000

    redis_client = get_redis()
    redis_status = "up"
    if redis_client:
        try:
            redis_client.ping()
        except Exception:
            redis_status = "down"
    else:
        redis_status = "disabled"

    return {
        "status": "healthy",
        "checks": {
            "database": {"status": "up", "latency_ms": round(db_latency_ms, 2)},
            "redis": {"status": redis_status},
        },
    }
