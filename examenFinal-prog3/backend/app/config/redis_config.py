import redis
from .settings import get_settings

settings = get_settings()

_pool: redis.ConnectionPool | None = None
_client: redis.Redis | None = None

if settings.redis_enabled:
    _pool = redis.ConnectionPool(
        host=settings.redis_host,
        port=settings.redis_port,
        db=settings.redis_db,
        password=settings.redis_password,
        max_connections=settings.redis_max_connections,
        decode_responses=True,
    )
    _client = redis.Redis(connection_pool=_pool, socket_timeout=5)


def get_redis():
    return _client


def check_redis_connection() -> bool:
    if _client is None:
        return False
    try:
        return bool(_client.ping())
    except Exception:
        return False


def close_redis():
    if _pool:
        _pool.disconnect()
