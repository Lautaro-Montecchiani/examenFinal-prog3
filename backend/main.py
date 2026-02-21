from app.main import app  # noqa: F401

if __name__ == "__main__":
    import uvicorn
    from app.config.settings import get_settings

    settings = get_settings()
    uvicorn.run("app.main:app", host=settings.api_host, port=settings.api_port, reload=True)
