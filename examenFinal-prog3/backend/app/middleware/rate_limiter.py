import time
from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from ..config.redis_config import get_redis
from ..config.settings import get_settings


class RateLimiterMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)
        self.settings = get_settings()
        self.redis = get_redis()
        self.excluded_paths = {"/health_check"}

    async def dispatch(self, request: Request, call_next):
        if request.url.path in self.excluded_paths:
            return await call_next(request)

        if not self.settings.rate_limit_enabled or self.redis is None:
            return await call_next(request)

        client_ip = request.client.host or "unknown"
        key = f"rate_limit:{client_ip}"
        pipe = self.redis.pipeline()
        pipe.incr(key, 1)
        pipe.expire(key, self.settings.rate_limit_period)
        count, _ = pipe.execute()

        if count > self.settings.rate_limit_calls:
            retry_after = int(self.redis.ttl(key))
            raise HTTPException(
                status_code=429,
                detail="Rate limit exceeded. Maximum requests per window reached.",
                headers={
                    "Retry-After": str(retry_after if retry_after > 0 else self.settings.rate_limit_period),
                    "X-RateLimit-Limit": str(self.settings.rate_limit_calls),
                    "X-RateLimit-Remaining": "0",
                    "X-RateLimit-Reset": str(self.settings.rate_limit_period),
                },
            )

        response = await call_next(request)
        remaining = max(self.settings.rate_limit_calls - count, 0)
        response.headers["X-RateLimit-Limit"] = str(self.settings.rate_limit_calls)
        response.headers["X-RateLimit-Remaining"] = str(remaining)
        response.headers["X-RateLimit-Reset"] = str(self.settings.rate_limit_period)
        return response
