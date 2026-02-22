# IA_CONTEXT — Contexto del Proyecto

Este archivo resume la estructura, propósito, comandos de ejecución, variables importantes y endpoints principales del proyecto fullstack (FastAPI backend + Vite React frontend).

**Resumen del proyecto**
- **Tipo:** Fullstack E-commerce de Servicios Digitales Intangibles (API REST con FastAPI + Frontend Vite/React).
- **Frontend AIDS (Artificial Intelligent Digital Solutions):** Plataforma web moderna, oscura y con animaciones, enfocada en la venta de herramientas digitales, assets y soluciones para desarrolladores (inspirado en kodear.dev). Usa `react-router-dom` para las páginas: Home, Catalog, Product Detail, Cart.
- **Backend:** Python 3.11+, FastAPI, SQLAlchemy, SQLite (localmente devolviendo fallbacks) o Postgres.
- **Flujo Principal:** Los usuarios navegan el catálogo de servicios, los agregan al carrito, y generan un Client/Bill/Order/OrderDetail en el backend descontando el "stock" del servicio.

**Estructura principal**
- `backend/`: servidor FastAPI, Dockerfiles, tests.
  - `backend/main.py`, `backend/run_production.py`: entrypoints (desarrollo y producción).
  - `backend/app/`: código de la aplicación (controllers, models, services, config, schemas, middleware).
  - `backend/requirements.txt`: dependencias Python.
- `frontend/`: Vite React app (`src/`, `api/`, `components/`, `hooks/`).

**Comandos rápidos**
- Backend (desarrollo):
  - Windows (desde `backend`):
    ```powershell
    python -m venv .venv
    .\.venv\Scripts\activate
    pip install -r requirements.txt
    copy .env.example .env
    python main.py  # abre http://localhost:8000/docs
    ```
- Backend (producción / Render):
  - `python run_production.py` (usa parámetros de `app.config.settings`).
- Frontend (desarrollo):
  ```bash
  cd frontend
  npm install
  npm run dev -- --host --port 5173
  ```

**Variables de entorno relevantes**
- API / Uvicorn: `API_HOST`, `API_PORT`, `UVICORN_WORKERS`, `RELOAD`, `LOG_LEVEL`, `ACCESS_LOG`, `BACKLOG`, `TIMEOUT_KEEP_ALIVE`.
- PostgreSQL: `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, pool settings (`DB_POOL_SIZE`, etc.).
- Redis: `REDIS_ENABLED`, `REDIS_HOST`, `REDIS_PORT`, `REDIS_DB`, `REDIS_PASSWORD`, `REDIS_CACHE_TTL`.
- Rate limiting / CORS: `RATE_LIMIT_ENABLED`, `RATE_LIMIT_CALLS`, `RATE_LIMIT_PERIOD`, `CORS_ORIGINS`.

**Endpoints y responsabilidades clave**
- Health: `GET /health_check` (verificación básica y usada por docker/Render).
- CRUD (principales): `/products`, `/categories`, `/clients`, `/addresses`, `/bills`, `/orders`, `/order_details`, `/reviews`.
- Paginación: `skip`, `limit` como parámetros estándar.

**Archivos y módulos importantes**
- Configuración: `backend/app/config/settings.py`, `database.py`, `redis_config.py`, `logging_config.py`.
- Rutas / controllers: `backend/app/controllers/*.py` (cada recurso tiene su controller).
- Lógica de negocio: `backend/app/services/*.py`.
- Modelos / esquemas: `backend/app/models/` y `backend/app/schemas/`.
- Middleware: `backend/app/middleware/` (rate limiter, error handler, request-id).

**Pruebas**
- Tests backend: ejecutar `pytest` desde `backend/`.

**Docker & Deploy**
- Desarrollo con Docker Compose: `cd backend && docker-compose up -d` (levanta Postgres + Redis + API si está configurado).
- Producción local: `cd backend && docker-compose -f docker-compose.prod.yml up -d`.
- Deploy en Render: build instalar dependencias + `python run_production.py`. Healthcheck: `/health_check`.

**Observabilidad y límites**
- Métricas Prometheus: habilitables con `METRICS_ENABLED=true`, expuestas en `/metrics`.
- Logs: configurables vía `LOG_LEVEL` y `request-id` en header `X-Request-ID`.
- Rate limit: headers `X-RateLimit-*` configurables por env.

**Checklist para pruebas E2E rápidas**
1. Levantar backend y `GET /health_check` responde 200.
2. DB y Redis accesibles; migraciones / alembic si aplica.
3. Crear categoría → crear producto → listar productos → ver detalle.
4. Crear orden con `order_details` que agote stock → validar error 400.
5. Frontend apunta a `VITE_API_URL` correcto y muestra lista de productos.

**Notas y recomendaciones**
- Mantener `.env` fuera del control de versiones; usar `.env.example` como plantilla.
- Verificar `requirements.txt` y `package.json` antes de deploy.
- Añadir README de backend y frontend separados si se amplía la documentación.

**Contacto / puntos de entrada para trabajar**
- Código backend principal: `backend/app/main.py`.
- Entrada de desarrollo: `backend/main.py`.
- Runner producción: `backend/run_production.py`.

---
Generado automáticamente para ayudar a agentes IA y desarrolladores a entender y arrancar el proyecto rápidamente.
