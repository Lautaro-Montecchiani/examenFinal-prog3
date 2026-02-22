import os
import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from .settings import get_settings

settings = get_settings()

POSTGRES_URI = (
    f"postgresql+psycopg2://{settings.postgres_user}:{settings.postgres_password}"
    f"@{settings.postgres_host}:{settings.postgres_port}/{settings.postgres_db}"
)
SQLITE_URI = "sqlite:///./sql_app.db"

# Intentar usar Postgres por defecto (para Docker/Prod), si falla, usar SQLite (Dev Local)
try:
    engine = create_engine(
        POSTGRES_URI,
        pool_pre_ping=True,
        pool_size=settings.db_pool_size,
        max_overflow=settings.db_max_overflow,
        pool_timeout=settings.db_pool_timeout,
        pool_recycle=settings.db_pool_recycle,
    )
    # Test connection
    with engine.connect() as conn:
        pass
    print("Conectado a PostgreSQL exitosamente.")
except Exception as e:
    print(f"PostgreSQL no disponible ({e}). Haciendo fallback a SQLite local.")
    engine = create_engine(
        SQLITE_URI,
        connect_args={"check_same_thread": False},
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
