# Локальный запуск Wishu

Откройте скачанный или клонированный репозиторий как папку в VS Code. Нужны Node.js 24, pnpm 12.11.2 и Docker Desktop с работающим Docker Engine. Команды выполняются из корня проекта. Сами контейнеры и приложение при подготовке этой инструкции не запускались.

## VS Code: Vite + NestJS, PostgreSQL в Docker

Один раз подготовьте окружение, не перезаписывая уже настроенные `.env`:

```powershell
pnpm install
Copy-Item .env.example .env
Copy-Item server/.env.example server/.env
docker compose up -d postgres
pnpm db:init
pnpm dev:all
```

Откройте `http://localhost:5173`. API работает на `http://localhost:3000/api`. Первая инициализация создаёт таблицы и загружает общую базу вопросов. При последующих запусках достаточно `docker compose up -d postgres` и `pnpm dev:all`.

Корневые POSTGRES_USER/POSTGRES_PASSWORD/POSTGRES_DB/POSTGRES_PORT должны соответствовать PGUSER/PGPASSWORD/PGDATABASE/PGPORT в `server/.env`. В примерах используется локальный порт 15432, внутри контейнера - 5432. Если порт занят, измените оба примера настройки согласованно. Не публикуйте рабочие `.env`.

## Docker: API и PostgreSQL, UI через Vite

Текущий compose содержит PostgreSQL и необязательный профиль API. Frontend в этой конфигурации запускается через Vite, отдельного UI-контейнера пока нет.

```powershell
pnpm install
Copy-Item .env.example .env
docker compose --profile api up -d --build
docker compose --profile api exec api node dist/database/cli.js init
pnpm dev
```

Не запускайте `pnpm dev:server`/`pnpm dev:all` одновременно с API-контейнером на том же порту. На следующих запусках команду init повторять не нужно. После обновления проекта применяйте миграции и seed в выбранной среде:

```powershell
# Локальный NestJS
pnpm db:migrate
pnpm db:seed

# Или API-контейнер после его пересборки
docker compose --profile api exec api node dist/database/cli.js migrate
docker compose --profile api exec api node dist/database/cli.js seed
```

Миграции не заменяют seed. Seed обновляет редакторские вопросы по ID и не должен удалять пользовательские вопросы. Обновление общих материалов не переносит браузерные данные между разными устройствами и origin.

## Баги и предложения

Владелец проекта указывает `VITE_FEEDBACK_GITHUB_REPOSITORY=owner/repository` в публичном примере окружения. Пользователи получают готовую форму передачи предложений через GitHub Issues или JSON. Локальная PostgreSQL сама по себе не отправляет обращения владельцу репозитория. [Подробности форм и ручной проверки](platform-feedback.md).

Остановка: Ctrl+C завершает Vite/NestJS; `docker compose --profile api down` останавливает контейнеры и сохраняет данные volume.
