import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator
from .config.settings import get_settings
from .config.database import Base, engine
from .config.logging_config import setup_logging
from .config.redis_config import check_redis_connection, close_redis
from .middleware.rate_limiter import RateLimiterMiddleware
from .middleware.request_id_middleware import RequestIDMiddleware
from .middleware.error_handler import ErrorHandlerMiddleware
from .controllers import (
    product_controller,
    category_controller,
    client_controller,
    address_controller,
    bill_controller,
    order_controller,
    order_detail_controller,
    review_controller,
    health_check,
)

settings = get_settings()
logger = setup_logging(settings.log_level)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="E-commerce REST API", version="1.0.0")

origins = [o.strip() for o in settings.cors_origins.split(",") if o]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if origins != ["*"] else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(RateLimiterMiddleware)
app.add_middleware(RequestIDMiddleware)
app.add_middleware(ErrorHandlerMiddleware)

app.include_router(product_controller.router)
app.include_router(category_controller.router)
app.include_router(client_controller.router)
app.include_router(address_controller.router)
app.include_router(bill_controller.router)
app.include_router(order_controller.router)
app.include_router(order_detail_controller.router)
app.include_router(review_controller.router)
app.include_router(health_check.router)


@app.on_event("startup")
async def on_startup():
    logger.info("E-commerce API starting up")
    if settings.metrics_enabled:
        Instrumentator().instrument(app).expose(app, include_in_schema=False)
    if settings.redis_enabled and not check_redis_connection():
        logger.warning("Redis connection failed; cache and rate limiting may be disabled")


@app.on_event("shutdown")
async def on_shutdown():
    close_redis()
    logger.info("E-commerce API shutting down")


@app.get("/")
def root():
    return {"message": "E-commerce API is running"}


if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host=settings.api_host,
        port=settings.api_port,
        reload=settings.reload,
        workers=settings.uvicorn_workers,
        backlog=settings.backlog,
        timeout_keep_alive=settings.timeout_keep_alive,
        limit_concurrency=settings.limit_concurrency,
        limit_max_requests=settings.limit_max_requests,
        log_level=settings.log_level.lower(),
        access_log=settings.access_log,
    )
