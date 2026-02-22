import multiprocessing
import uvicorn
from app.config.settings import get_settings

settings = get_settings()
computed_workers = max(1, multiprocessing.cpu_count() * 2 + 1)
workers = settings.uvicorn_workers or computed_workers

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host=settings.api_host,
        port=settings.api_port,
        workers=workers,
        backlog=settings.backlog,
        timeout_keep_alive=settings.timeout_keep_alive,
        limit_concurrency=settings.limit_concurrency,
        limit_max_requests=settings.limit_max_requests,
        log_level=settings.log_level.lower(),
        access_log=settings.access_log,
    )
