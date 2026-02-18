import logging
import uuid
from fastapi import HTTPException, Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

logger = logging.getLogger(__name__)


class ErrorHandlerMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            return await call_next(request)
        except HTTPException as exc:
            request_id = getattr(request.state, "request_id", None) or str(uuid.uuid4())
            request.state.request_id = request_id
            logger.warning(
                "HTTPException", extra={"status_code": exc.status_code, "detail": exc.detail, "request_id": request_id}
            )
            return JSONResponse(
                status_code=exc.status_code,
                content={"detail": exc.detail, "request_id": request_id},
                headers=exc.headers,
            )
        except Exception as exc:
            request_id = getattr(request.state, "request_id", None) or str(uuid.uuid4())
            request.state.request_id = request_id
            logger.error("Unhandled exception", exc_info=exc, extra={"request_id": request_id})
            return JSONResponse(
                status_code=500,
                content={"detail": "Internal server error", "request_id": request_id},
            )
