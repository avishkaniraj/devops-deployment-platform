# DevOps Task Management Application

A beginner-friendly full-stack task manager built with React, Spring Boot, and PostgreSQL. Docker Compose runs the complete local application behind an Nginx frontend.

## Architecture

```text
Browser (http://localhost)
        |
        v
Frontend / Nginx
  | serves React
  | proxies /api
        v
Spring Boot backend:8080
        |
        v
PostgreSQL postgres:5432
        |
        v
postgres_data named volume
```

Only Nginx port 80 is published to the host. The backend and database communicate over the default private Compose network using service names.

## Prerequisites

- Docker Desktop with Docker Compose
- Port 80 available on the host

## Environment setup

Copy the example file and replace the placeholder password:

```powershell
Copy-Item .env.example .env
```

`.env.example` documents the required variables and is committed. `.env` contains local values, is ignored by Git, and is not production secret management. A managed secret service will be used in a later deployment phase.

## Start the application

```powershell
docker compose up --build
```

For detached mode:

```powershell
docker compose up --build -d
docker compose ps
```

Open <http://localhost>.

## Health checks

View container health:

```powershell
docker compose ps
```

Check the backend Actuator endpoint from inside its container:

```powershell
docker compose exec backend wget -qO- http://localhost:8080/actuator/health
```

Actuator is used internally for health checking and is not publicly proxied by Nginx.

## Logs and troubleshooting

```powershell
docker compose logs
docker compose logs backend
docker compose logs frontend
docker compose logs postgres
docker compose logs -f backend
docker compose restart backend
docker compose stop backend
docker compose up -d backend
docker images
docker volume ls
docker network ls
```

If port 80 is already used, identify the conflicting process or temporarily change the frontend mapping to `3000:80`, then browse to `http://localhost:3000`.

## Stop the application

Stop and remove the Compose containers and network while keeping database data:

```powershell
docker compose down
```

Start it again with:

```powershell
docker compose up -d
```

The `postgres_data` named volume keeps tasks between these commands.

> **Destructive:** `docker compose down -v` also deletes the PostgreSQL named volume and all task data stored in it.

## Local development without Docker

The backend defaults to PostgreSQL at `localhost:5432`. Set its password in the current PowerShell session:

```powershell
$env:DB_PASSWORD = "your-local-password"
cd backend
.\mvnw.cmd spring-boot:run
```

In a second terminal, Vite proxies `/api` requests to the local backend:

```powershell
cd frontend
npm install
npm run dev
```

Open <http://localhost:5173>.

In both local and Docker modes, React calls the relative URL `/api/tasks`. Vite handles it during development, while Nginx sends it to `backend:8080` in Docker.
