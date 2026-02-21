# Fullstack E-commerce (FastAPI + Vite React)

Backend basado en FastAPI (inspirado en cortezalberto/Final2025Python) y frontend React con Vite.

## Estructura
- backend/: API FastAPI, Docker/Compose, tests mínimos.
- frontend/: Vite React con consumo de `/products`.

## Requisitos locales
- Python 3.11
- Node 18+
- Docker Desktop (opcional pero recomendado)

## Backend (local)
```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate   # Windows
pip install -r requirements.txt
copy .env.example .env
# Opcional: servicios locales
# docker-compose up -d
python main.py  # http://localhost:8000/docs
```

Variables clave (.env):
- API/uvicorn: `API_HOST`, `API_PORT`, `UVICORN_WORKERS`, `RELOAD`, `BACKLOG`, `TIMEOUT_KEEP_ALIVE`, `LIMIT_CONCURRENCY`, `LIMIT_MAX_REQUESTS`, `LOG_LEVEL`, `ACCESS_LOG`.
- Postgres: `POSTGRES_*`, `DB_POOL_SIZE`, `DB_MAX_OVERFLOW`, `DB_POOL_TIMEOUT`, `DB_POOL_RECYCLE`.
- Redis: `REDIS_ENABLED`, `REDIS_HOST`, `REDIS_PORT`, `REDIS_DB`, `REDIS_PASSWORD`, `REDIS_CACHE_TTL`, `REDIS_MAX_CONNECTIONS`.
- Rate limit: `RATE_LIMIT_ENABLED`, `RATE_LIMIT_CALLS`, `RATE_LIMIT_PERIOD`.
- CORS: `CORS_ORIGINS`.

Tests backend:
```bash
cd backend
pytest
```

## Frontend (local)
```bash
cd frontend
npm install
npm run dev -- --host --port 5173
```
Config API: editar `.env.local` (`VITE_API_URL=http://localhost:8000`).

## Docker
- Dev rápido: `cd backend && docker-compose up -d` (Postgres + Redis con healthchecks y volúmenes persistentes).
- Producción local: `cd backend && docker-compose -f docker-compose.prod.yml up -d` (volúmenes para datos y Redis, reinicios `unless-stopped`).

## Observabilidad
- Logs: nivel configurable con `LOG_LEVEL`, request-id en header `X-Request-ID`.
- Rate limit: headers `X-RateLimit-*`, configurable vía env.
- Métricas Prometheus: habilitadas si `METRICS_ENABLED=true`, expuestas en `/metrics` (no listadas en OpenAPI).

## Deploy en Render (backend)
- Tipo: Web Service.
- Build: `pip install -r requirements.txt`.
- Start: `python run_production.py` (usa workers y tunning desde .env).
- Puerto interno: 10000.
- Vars: `API_PORT=10000`, `API_HOST=0.0.0.0`, `UVICORN_WORKERS` (o dejar en blanco para auto), `POSTGRES_*` (add-on PG), `REDIS_*` (add-on Redis, `REDIS_ENABLED=true`), `CORS_ORIGINS=https://<frontend>.onrender.com`.
- Health check path: `/health_check`.

## Deploy en Render (frontend)
- Tipo: Static Site (Vite).
- Build: `npm install && npm run build`.
- Publish dir: `dist`.
- Env: `VITE_API_URL=https://<api>.onrender.com`.

## Endpoints principales
- `GET /health_check`
- CRUD: `/products`, `/categories`, `/clients`, `/addresses`, `/bills`, `/orders`, `/order_details`, `/reviews`
- Paginación: `skip`, `limit`.

## Checklist E2E
- Backend up y `GET /health_check` OK.
- DB/Redis accesibles; .env configurado.
- Crear categoría → crear producto → listar → detalle → actualizar → borrar.
- Stock: crear order_detail con stock insuficiente devuelve 400.
- Frontend apunta a backend correcto; lista y crea productos.
