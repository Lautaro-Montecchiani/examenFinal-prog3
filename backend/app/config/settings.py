from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    api_host: str = Field("0.0.0.0", alias="API_HOST")
    api_port: int = Field(8000, alias="API_PORT")
    uvicorn_workers: int = Field(1, alias="UVICORN_WORKERS")
    reload: bool = Field(False, alias="RELOAD")

    postgres_host: str = Field("localhost", alias="POSTGRES_HOST")
    postgres_port: int = Field(5432, alias="POSTGRES_PORT")
    postgres_db: str = Field("ecommerce_dev", alias="POSTGRES_DB")
    postgres_user: str = Field("postgres", alias="POSTGRES_USER")
    postgres_password: str = Field("postgres", alias="POSTGRES_PASSWORD")
    db_pool_size: int = Field(50, alias="DB_POOL_SIZE")
    db_max_overflow: int = Field(100, alias="DB_MAX_OVERFLOW")
    db_pool_timeout: int = Field(10, alias="DB_POOL_TIMEOUT")
    db_pool_recycle: int = Field(3600, alias="DB_POOL_RECYCLE")

    redis_enabled: bool = Field(True, alias="REDIS_ENABLED")
    redis_host: str = Field("localhost", alias="REDIS_HOST")
    redis_port: int = Field(6379, alias="REDIS_PORT")
    redis_db: int = Field(0, alias="REDIS_DB")
    redis_password: str | None = Field(None, alias="REDIS_PASSWORD")
    redis_cache_ttl: int = Field(300, alias="REDIS_CACHE_TTL")
    redis_max_connections: int = Field(50, alias="REDIS_MAX_CONNECTIONS")

    rate_limit_enabled: bool = Field(True, alias="RATE_LIMIT_ENABLED")
    rate_limit_calls: int = Field(100, alias="RATE_LIMIT_CALLS")
    rate_limit_period: int = Field(60, alias="RATE_LIMIT_PERIOD")

    cors_origins: str = Field("*", alias="CORS_ORIGINS")

    metrics_enabled: bool = Field(True, alias="METRICS_ENABLED")

    log_level: str = Field("INFO", alias="LOG_LEVEL")
    access_log: bool = Field(True, alias="ACCESS_LOG")

    backlog: int = Field(2048, alias="BACKLOG")
    timeout_keep_alive: int = Field(5, alias="TIMEOUT_KEEP_ALIVE")
    limit_concurrency: int = Field(1000, alias="LIMIT_CONCURRENCY")
    limit_max_requests: int = Field(10000, alias="LIMIT_MAX_REQUESTS")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"


def get_settings() -> Settings:
    return Settings()
