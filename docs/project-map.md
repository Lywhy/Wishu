# Карта проекта Wishu

Короткая точка входа для доработок. Начинать с строки нужной области, затем читать её файлы и соответствующую инструкцию. Не перечитывать весь каталог вопросов для изменения одного подраздела. При добавлении маршрута, источника данных или API обновлять эту карту в том же изменении.

## Приложение и интерфейс

| Область                               | Точки входа                                                                                 | Данные и связанные компоненты                                                                                                                      |
| ------------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Запуск UI и провайдеры                | `src/main.tsx`, `src/App.tsx`                                                               | `ThemeProvider`, `InterfaceMotion`; маршруты React Router                                                                                          |
| Общая оболочка                        | `src/components/app-layout.tsx`                                                             | Шапка, навигация, правила показа footer                                                                                                            |
| Общие стили и компоненты              | `src/index.css`, `src/components/ui/`                                                       | Tailwind, shadcn Base UI; общие блоки каталога в `src/components/catalog/` (заголовки, фильтры, загрузка); раскрытия в `experience/disclosure.tsx` |
| Обучение                              | `src/pages/learning-page.tsx`, `learning-course-page.tsx`                                   | `src/data/learning-modules.ts`, `learning-course.ts`, `src/components/learning/`, `src/stores/learning-progress.ts`                                |
| Каталог вопросов                      | `src/pages/questions-page.tsx`, `question-section-page.tsx`, `question-subsection-page.tsx` | `src/components/questions/questions-layout.tsx`, `src/lib/question-api.ts`, `src/lib/question-catalog-context.ts`                                  |
| Вопрос и навигация                    | `src/pages/question-detail-page.tsx`                                                        | `src/components/questions/`, `src/lib/javascript-answer-markdown.ts`, `src/data/question-session.ts`                                               |
| Добавление вопроса из UI              | `src/pages/question-create-page.tsx`                                                        | `src/lib/question-api.ts`; сохраняет в PostgreSQL, не в JSON-исходники                                                                             |
| Сессия повторения                     | `src/pages/study-session-page.tsx`                                                          | `src/stores/short-session.ts`, каталог и прогресс вопросов                                                                                         |
| Каталог и страница задачи             | `src/pages/tasks-page.tsx`, `task-detail-page.tsx`                                          | `src/data/interview-content.ts`, `additional-tasks.ts`, `javascript-interview-tasks.ts`                                                            |
| Редактор и проверка решения           | `src/components/practice/` (включая `task-workspace.tsx` на shadcn Resizable)               | `src/lib/task-checker.ts`, `task-compile.worker.ts`, `task-sandbox-runtime.js`, `task-type-contracts.ts`, `value-differences.ts`                   |
| Собеседования                         | `src/pages/interviews-page.tsx`                                                             | `src/data/interviews.ts`, `src/stores/interviews.ts`; Zustand и хранилище браузера                                                                 |
| Прогресс и вспомогательные UX-функции | `src/stores/`, `src/components/experience/`                                                 | Заметки, планы, фильтры, обратная связь, восстановление прокрутки                                                                                  |

Первая страница - `/learn`. Остальные основные маршруты - `/questions`, `/tasks`, `/interviews`. Полный список и вложенность всегда смотреть в `src/App.tsx`.

## Пробное собеседование, повторение и общий поиск

Маршрут /mock-interview расположен внутри QuestionsLayout; вход со страницы /session или через общий поиск. Состояние - stores/mock-interview.ts. Интервальное повторение - stores/review-schedule.ts, запись даты выполняется после сохранения серверной отметки. Подборка «На сегодня» находится в questions-page.tsx.

Общий поиск - experience/global-search.tsx и shadcn ui/command.tsx. Ссылки на подборки - experience/share-collection.tsx. Разбор встречи - interviews/interview-debrief.tsx и необязательное поле debrief в InterviewRecord. [Поведение и ручная проверка](mock-interview-and-search.md).

## Настройки и сохранение рабочего состояния

Настройки вида и чтения: src/stores/interface-settings.ts и experience/interface-settings.tsx. Надёжная запись локальных изменений: lib/browser-storage.ts, stores/local-save-status.ts и experience/local-save-notice.tsx. Серверная очередь отметок находится в practice-progress.ts; её состояние отображает question-save-notice.tsx.

Состояние Monaco и вкладки: stores/task-experience.ts. Разбор результатов: experience/result-value.tsx. План подготовки в трекере: interviews/interview-preparation.tsx и необязательное поле preparation в InterviewRecord. [Описание и ручная проверка](ux-preparation-workflow.md).

## Декоративный фон React Bits

В components.json зарегистрирован @react-bits: https://reactbits.dev/r/{name}.json. Установка новых компонентов: pnpm exec shadcn add @react-bits/<Name>-TS-TW. Использовать TypeScript/Tailwind варианты.

GradientASCII.tsx - исходник React Bits с проектными визуальными значениями по умолчанию. Размер символов, плотность, свечение, скорость и другие базовые параметры менять в аргументах этого компонента; обёртка их не дублирует. experience/gradient-background.tsx задаёт кофейные палитры, прозрачность, уменьшенное движение и отключение взаимодействий. Компонент загружается лениво из AppLayout один раз на оболочку; отдельные страницы не должны создавать свои canvas. При отсутствии WebGL2 остаётся базовый цвет темы. Приложение и проверки запускает пользователь.

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
