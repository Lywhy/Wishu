# Wishu

Все команды выполняются из корня проекта в PowerShell. Копируйте `.env` только при первой настройке, не перезаписывая существующие файлы.

## Локальный запуск

Нужны Node.js 24, pnpm 12.11.2 и Docker Desktop для PostgreSQL.

1. Установите зависимости и подготовьте окружение:

```powershell
npm install --global pnpm@12.11.2
pnpm install
Copy-Item .env.example .env
Copy-Item server/.env.example server/.env
```

Параметры `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_PORT` в `.env` должны совпадать с `PGUSER`, `PGPASSWORD`, `PGDATABASE`, `PGPORT` в `server/.env`. В примерах всё уже согласовано.

2. Запустите базу, создайте таблицы и загрузите вопросы:

```powershell
docker compose up -d --wait postgres
pnpm db:init
```

Если PostgreSQL уже установлен локально, укажите его параметры в `server/.env` и пропустите запуск контейнера.

3. Запустите frontend и API:

```powershell
pnpm dev:all
```

Откройте [http://localhost:5173](http://localhost:5173).

Для повторного запуска достаточно поднять PostgreSQL и выполнить `pnpm dev:all`. После обновления проекта выполните `pnpm install` и `pnpm db:init` перед запуском.

Остановка: `Ctrl+C`, затем `docker compose stop postgres`, если база запущена в Docker.

## Запуск через Docker

Нужен Docker Desktop с Docker Compose. Node.js и pnpm на компьютере не требуются. Frontend, API и PostgreSQL работают в контейнерах.

1. Подготовьте окружение:

```powershell
Copy-Item .env.example .env
```

2. Соберите API и подготовьте базу:

```powershell
docker compose --profile app build
docker compose up -d --wait postgres
docker compose --profile app run --rm api node dist/database/cli.js init
```

3. Запустите приложение:

```powershell
docker compose --profile app up -d --wait
```

Откройте [http://localhost:5173](http://localhost:5173). Порт frontend можно изменить через `WEB_PORT` в `.env`.

Для повторного запуска выполните `docker compose --profile app up -d --wait`. После обновления проекта повторите шаги 2 и 3: `init` применяет новые миграции и обновляет общие вопросы, сохраняя пользовательские данные.

Остановка с сохранением базы:

```powershell
docker compose --profile app down
```

Локальный запуск и Docker используют одни и те же порты, поэтому запускайте один вариант за раз.
