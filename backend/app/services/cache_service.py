import json
from typing import Any
from ..config.redis_config import get_redis
from ..config.settings import get_settings

settings = get_settings()


class CacheService:
    def __init__(self):
        self.redis = get_redis()
        self.enabled = settings.redis_enabled and self.redis is not None
        self.default_ttl = settings.redis_cache_ttl

    def get(self, key: str) -> Any:
        if not self.enabled:
            return None
        raw = self.redis.get(key)
        if raw is None:
            return None
        try:
            if isinstance(raw, bytes):
                raw = raw.decode("utf-8")
            return json.loads(raw)
        except Exception:
            return raw

    def set(self, key: str, value: Any, ttl: int | None = None):
        if not self.enabled:
            return
        self.redis.set(key, json.dumps(value, default=str), ex=ttl or self.default_ttl)

    def delete(self, key: str):
        if not self.enabled:
            return
        self.redis.delete(key)

    def delete_pattern(self, pattern: str):
        if not self.enabled:
            return
        keys = self.redis.keys(pattern)
        if keys:
            self.redis.delete(*keys)
