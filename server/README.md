# Wishu API

NestJS + PostgreSQL. Backend расположен отдельно в `server`, frontend остаётся
в корневом `src`. Зависимости управляются одним pnpm workspace и lock-файлом.
Для локальной работы используйте Node.js 24 и pnpm 12.11.2.

## Локальный запуск

Команды выполняются из корня Wishu в PowerShell:

```powershell
pnpm install
Copy-Item .env.example .env
Copy-Item server/.env.example server/.env
docker compose up -d postgres
pnpm dev:server
```

Копируйте примеры окружения только при первой настройке, не перезаписывайте
существующие `.env`. Значения `PGUSER`, `PGPASSWORD`, `PGDATABASE` и `PGPORT` в
`server/.env` должны соответствовать `POSTGRES_USER`, `POSTGRES_PASSWORD`,
`POSTGRES_DB` и `POSTGRES_PORT` в корневом `.env`. `PGHOST=127.0.0.1` для локального
API; в контейнере имя хоста задаётся автоматически как `postgres`.

Пароли из примеров предназначены для локальной разработки. Рабочие `.env`
не сохраняются в Git. Значения PostgreSQL применяются при первом создании volume:
изменение `.env` не меняет пароль уже существующей базы.

Для совместного запуска UI и API используйте `pnpm dev:all` из корня проекта. Ctrl+C останавливает оба процесса. PostgreSQL должен быть запущен отдельно. Frontend также запускается отдельно прежней командой `pnpm dev`. CORS по умолчанию
разрешает `http://localhost:5173`; при использовании другого адреса измените
`CORS_ORIGIN` (origin без завершающего слеша).

## Команды из корня проекта

```powershell
pnpm dev:server
pnpm build:server
pnpm start:server
pnpm typecheck:server
pnpm lint
pnpm format:check
```

`start:server` запускает ранее собранный `server/dist/main.js`.
Глобальная установка Nest CLI не нужна.

## API вместе с PostgreSQL в Docker

После создания корневого `.env`:

```powershell
docker compose --profile api up -d --build
docker compose logs -f api
docker compose --profile api down
```

Профиль `api` необязателен: можно использовать контейнер только для базы,
а API запускать локально с наблюдением за файлами. Не запускайте локальный API
и контейнер API на одном порту одновременно. Остановка через `down` сохраняет
данные в именованном volume. Порты контейнеров опубликованы только на localhost.

## Ручная проверка

```powershell
Invoke-RestMethod http://localhost:3000/api/health
Invoke-RestMethod http://localhost:3000/api/health/ready
```

Ожидается:

- `GET /api/health`: HTTP 200, `{ "status": "ok", "service": "wishu-api" }`.
- `GET /api/health/ready`: HTTP 200, `{ "status": "ok", "database": "up" }`.
- При недоступной базе readiness отвечает HTTP 503, liveness остаётся HTTP 200.
- При некорректных переменных окружения API не стартует и сообщает имя настройки.

## Структура

- `src/config` - проверка переменных окружения при запуске.
- `src/database` - пул `pg`, таймауты и закрытие соединений при завершении.
- `src/modules/health` - состояние процесса и готовность базы.
- `src/modules/questions` - API каталога и прогресса вопросов.
- `src/modules/learning`, `tasks` - основы остальных предметных модулей.

Все маршруты имеют префикс `/api`. Включены Helmet, CORS для заданного origin
и глобальная `ValidationPipe` для будущих DTO с декораторами class-validator.
Неизвестные поля DTO отклоняются. Запросы SQL с пользовательскими значениями
нужно выполнять с параметрами `$1`, `$2` через `DatabaseService.query`.

Для вопросов добавлены SQL-миграции, начальные данные и анонимные профили прогресса.
ORM, аккаунты и выполнение пользовательского кода пока не добавлены.
Проверка готовности выполняет только `SELECT 1`.

Сервер, Docker, сборка, линтер и проверки при подготовке основы не запускались.
Команды и ожидаемые результаты выше предназначены для самостоятельного запуска.

## Порт PostgreSQL на Windows

Для локального подключения используется `127.0.0.1:15432`: в корневом `.env`
указан `POSTGRES_PORT=15432`, в `server/.env` - `PGPORT=15432`.
Внутри Docker PostgreSQL по-прежнему слушает `5432`; API в Docker подключается
к `postgres:5432`.

Если Docker сообщает об ошибке доступа к порту при публикации `5432`, повторите
`docker compose up -d postgres` после изменения настроек. Compose пересоздаст
контейнер с новым портом, сохранив volume с данными. После изменения
`server/.env` перезапустите локальный backend или `pnpm dev:all`.

## API вопросов

Первый запуск, миграции, наполнение и ручная проверка описаны в [QUESTIONS.md](QUESTIONS.md).
Перед открытием вопросов выполните `pnpm db:init` из корня проекта.
