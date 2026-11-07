# Карта проекта Wishu

Короткая точка входа для доработок. Начинать с строки нужной области, затем читать её файлы и соответствующую инструкцию. Не перечитывать весь каталог вопросов для изменения одного подраздела. При добавлении маршрута, источника данных или API обновлять эту карту в том же изменении.

## Приложение и интерфейс

| Область                               | Точки входа                                                                                 | Данные и связанные компоненты                                                                                                    |
| ------------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Запуск UI и провайдеры                | `src/main.tsx`, `src/App.tsx`                                                               | `ThemeProvider`, `InterfaceMotion`; маршруты React Router                                                                        |
| Общая оболочка                        | `src/components/app-layout.tsx`                                                             | Шапка, навигация, правила показа footer                                                                                          |
| Общие стили и компоненты              | `src/index.css`, `src/components/ui/`                                                       | Tailwind, shadcn Base UI; общие блоки каталога в `src/components/catalog/`                                                       |
| Обучение                              | `src/pages/learning-page.tsx`, `learning-course-page.tsx`                                   | `src/data/learning-modules.ts`, `learning-course.ts`, `src/components/learning/`, `src/stores/learning-progress.ts`              |
| Каталог вопросов                      | `src/pages/questions-page.tsx`, `question-section-page.tsx`, `question-subsection-page.tsx` | `src/components/questions/questions-layout.tsx`, `src/lib/question-api.ts`, `src/lib/question-catalog-context.ts`                |
| Вопрос и навигация                    | `src/pages/question-detail-page.tsx`                                                        | `src/components/questions/`, `src/lib/javascript-answer-markdown.ts`, `src/data/question-session.ts`                             |
| Добавление вопроса из UI              | `src/pages/question-create-page.tsx`                                                        | `src/lib/question-api.ts`; сохраняет в PostgreSQL, не в JSON-исходники                                                           |
| Сессия повторения                     | `src/pages/study-session-page.tsx`                                                          | `src/stores/short-session.ts`, каталог и прогресс вопросов                                                                       |
| Каталог и страница задачи             | `src/pages/tasks-page.tsx`, `task-detail-page.tsx`                                          | `src/data/interview-content.ts`, `additional-tasks.ts`, `javascript-interview-tasks.ts`                                          |
| Редактор и проверка решения           | `src/components/practice/`                                                                  | `src/lib/task-checker.ts`, `task-compile.worker.ts`, `task-sandbox-runtime.js`, `task-type-contracts.ts`, `value-differences.ts` |
| Собеседования                         | `src/pages/interviews-page.tsx`                                                             | `src/data/interviews.ts`, `src/stores/interviews.ts`; Zustand и хранилище браузера                                               |
| Прогресс и вспомогательные UX-функции | `src/stores/`, `src/components/experience/`                                                 | Заметки, планы, фильтры, обратная связь, восстановление прокрутки                                                                |

Первая страница - `/learn`. Остальные основные маршруты - `/questions`, `/tasks`, `/interviews`. Полный список и вложенность всегда смотреть в `src/App.tsx`.

## Вопросы: два пути поступления

Редакторский каталог:

```text
content/questions/catalog.json + <section>/<subsection>.json
  -> scripts/questions/build.mjs
  -> server/database/seeds/questions.json
  -> pnpm db:seed
  -> QuestionsSeedService -> PostgreSQL
  -> QuestionsController/QuestionsService -> question-api.ts -> QuestionsLayout -> страницы
```

Пользовательская форма: `QuestionCreatePage -> POST /api/questions -> PostgreSQL`. Записи не экспортируются автоматически в редакторские исходники. Seed делает upsert по ID и не удаляет пользовательские вопросы.

Для подготовки контента сначала смотреть `content/generated/question-index.json` и `question-coverage.json`, затем один исходник подраздела. Рабочие правила: `content/AGENTS.md`, [процесс наполнения](question-content-workflow.md), [качество вопросов](question-authoring-policy.md).

## Сервер

- `server/src/main.ts`: NestJS, префикс `/api`, CORS, Helmet и ValidationPipe.
- `server/src/app.module.ts`: регистрация модулей; окружение в `server/src/config/environment.ts`.
- `server/src/modules/questions/`: каталог, создание вопросов, cookie-профили, прогресс и настройки; DTO, контроллеры и сервисы.
- `server/src/modules/health/`: проверки состояния сервера и базы.
- `server/src/database/`: соединение/транзакции, запуск миграций, seed и CLI.
- `server/database/migrations/`: SQL-миграции; применённые файлы не редактировать.
- `server/src/modules/tasks/` и `learning/` пока содержат пустые модули. Не предполагать наличие серверного API обучения и задач: их материал и решения сейчас обрабатываются на frontend.

Прогресс вопросов синхронизируется через `src/stores/practice-progress.ts` и API. Учебный прогресс и записи собеседований имеют браузерное хранилище. Конкретную область хранения проверять в соответствующем store перед изменением логики.

## Настройки и инструкции

| Что меняем                | Где смотреть                                               |
| ------------------------- | ---------------------------------------------------------- |
| Команды                   | Корневой `package.json`, `server/package.json`             |
| Vite, alias, API proxy    | `vite.config.ts`; alias `@/` указывает на `src/`           |
| Типы UI и Vite            | `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` |
| Типы сервера              | `server/tsconfig.json`, `server/tsconfig.build.json`       |
| Линтер и форматирование   | `.oxlintrc.json`, `.oxfmtrc.json`                          |
| Окружение и PostgreSQL    | `.env.example`, `server/README.md`, compose-файл в корне   |
| Типовые доработки         | [development-recipes.md](development-recipes.md)           |
| Команды и ручная проверка | [development-workflow.md](development-workflow.md)         |

Агент редактирует файлы и выполняет контентные инструменты. Приложение, сборку и проверки UI/сервера, Docker, миграции и seed запускает пользователь.

## Обновлённый контентный цикл

С 2026-11-07 контентные команды разрешены агенту. Ответы находятся в content/answers, подробные навыки - в coverageGoals, источники - в content/references/sources.json, решения - в content/decisions.json, планы - в content/batches. Отчёт по умолчанию сравнивает только изменения; --all включает полный обзор. [Актуальная инструкция](content-workflow-v2.md) уточняет прежние ограничения запуска и формат импорта. Приложение и seed запускает пользователь.

## Компактный контекст

По умолчанию вывод короткий, подробности включаются параметрами. Find/context используют компактный lookup; show открывает ответ по ID. Batch хранит рабочие ID и хеши, источники доступны через sourceRefs. [Текущий процесс](lean-content-workflow.md) уточняет параметры и заменяет прежние примеры подробного вывода по умолчанию.
