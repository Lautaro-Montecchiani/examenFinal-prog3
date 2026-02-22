# IA_CONTEXT — Contexto del Proyecto

Este archivo resume la estructura, propósito, comandos de ejecución, variables importantes y endpoints principales del proyecto fullstack (FastAPI backend + Vite React frontend).

**Resumen del proyecto**
- **Tipo:** Fullstack E-commerce de Servicios Digitales Intangibles (API REST con FastAPI + Frontend Vite/React).
- **Frontend AIDS (Artificial Intelligent Digital Solutions):** Plataforma web B2B enfocada en la exhibición de assets digitales, automatizaciones e IA (inspirado en kodear.dev). Usa `react-router-dom` para las páginas: Home, Nosotros, Soluciones, y Detalle de Solución.
- **Backend:** Python 3.11+, FastAPI, SQLAlchemy, SQLite (localmente devolviendo fallbacks) o Postgres. Aún conserva la lógica de e-commerce transaccional en el backend para futuras implementaciones, aunque el frontend actual funciona como Landing Page / Portfolio B2B.
- **Flujo Principal:** Los usuarios navegan por los Casos de Éxito (Soluciones) y contactan vía email para cotizar implementaciones a medida (Agentes IA, E-commerce Headless, etc.).

**Estructura principal**
- `backend/`: servidor FastAPI, Dockerfiles, tests.
  - `backend/main.py`, `backend/run_production.py`: entrypoints (desarrollo y producción).
  - `backend/app/`: código de la aplicación (controllers, models, services, config, schemas, middleware).
  - `backend/requirements.txt`: dependencias Python.
- `frontend/`: Vite React app (`src/`, `api/`, `components/`, `context/`, `hooks/`).
  - El frontend utiliza el SDK de `axios` (`src/api/client.ts` y `src/api/checkout.ts`) para sincronizar datos y procesar la pasarela de compra.

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
  - Windows (desde `frontend`):
    ```bash
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
- Checkout Flow: Compuesto por POST a `/clients`, `/bills`, `/orders` y ciclo de POSTs a `/order_details` procesado en el Context de react mediante `processCheckout`.
- Paginación: `skip`, `limit` como parámetros estándar.

**Archivos y módulos importantes**
- Configuración: `backend/app/config/settings.py`, `database.py`, `redis_config.py`, `logging_config.py`.
- Rutas / controllers: `backend/app/controllers/*.py` (cada recurso tiene su controller).
- Lógica de negocio: `backend/app/services/*.py`.
  - `order_detail_service.py`: Lógica principal de integridad transaccional descontando las unidades de "stock" limitadas del activo virtual.
- Modelos / esquemas: `backend/app/models/` y `backend/app/schemas/`.
- Middleware: `backend/app/middleware/` (rate limiter, error handler, request-id).

**Pruebas**
- Tests backend: ejecutar `pytest .\tests\` desde `backend/` asegurando que `PYTHONPATH='.'` en la consola.
- Integración Frontend: `node` scripts contra el servidor corriendo en `localhost:8000`.

**Docker & Deploy**
- **¿Por qué hay tantos archivos de Docker?**
  - **`Dockerfile`**: Contiene las instrucciones para construir la imagen del backend (instalar Python, dependencias, copiar código).
  - **`docker-compose.yml`**: Es para **desarrollo local**. Levanta tu API, junto con servicios de apoyo como la base de datos PostgreSQL y Redis, mapeando puertos para que puedas probar todo en tu computadora.
  - **`docker-compose.prod.yml`**: Es para **producción self-hosted**. Está optimizado para correr en un servidor privado (VPS), asegurando reinicios automáticos (`restart: unless-stopped`) y sin exponer puertos de BD al exterior.
- **Desarrollo local rápido**: `cd backend && docker-compose up -d` (levanta todo el entorno).
- **Deploy en Render (Backend)**: 
  - Conectar el repo a Render y crear un **Web Service**.
  - **Build Command**: `pip install -r requirements.txt`
  - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port 10000`
  - Variables: Definir `POSTGRES_URI` (o usar la DB que te da Render gratis) y tus `.env`.
- **Deploy en Vercel/Render (Frontend)**:
  - Crear un **Static Site** (Render) o Project (Vercel) apuntando al framework Vite.
  - **Build Command**: `npm install && npm run build`
  - **Publish Directory**: `dist`

**Observabilidad y límites**
- Métricas Prometheus: habilitables con `METRICS_ENABLED=true`, expuestas en `/metrics`.
- Logs: configurables vía `LOG_LEVEL` y `request-id` en header `X-Request-ID`.
- Rate limit: headers `X-RateLimit-*` configurables por env.

**Checklist para pruebas E2E rápidas**
1. Levantar backend y `GET /health_check` responde 200.
2. DB y Redis accesibles; migraciones / alembic si aplica.
3. Crear categoría → crear producto → listar productos → ver detalle.
4. Crear orden con `order_details` que agote stock → validar error 400.
8. **Frontend**: El Frontend actual es un portfolio institucional (`/nosotros`, `/soluciones`) y no consume activamente el flujo de checkout, sirviendo como vitrina B2B.

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
