# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Линтинг и форматирование

Проект использует Oxlint для React/TypeScript и Oxfmt для форматирования.

```sh
pnpm lint
pnpm lint:fix
pnpm format:check
pnpm format
```

`lint` и `format:check` проверяют файлы без изменений. `lint:fix` применяет
доступные безопасные исправления, `format` форматирует проект.

Настройки находятся в `.oxlintrc.json` и `.oxfmtrc.json`. Правила корректности
и вызова хуков считаются ошибками; зависимости хуков и ограничения экспорта
для Fast Refresh - предупреждениями. Для `src/components/ui` отключено только
ограничение экспорта Fast Refresh: компоненты shadcn могут экспортировать варианты
вместе с компонентом.

Форматирование: 2 пробела, двойные кавычки, без точек с запятой, ширина строки
100 символов и окончания строк LF. Tailwind-классы сортируются с учётом
`src/index.css`, включая вызовы `cn`, `clsx` и `cva`.
Сборки, зависимости и coverage исключены; lock-файл не форматируется.

Приложение, линтер и форматтер запускает пользователь самостоятельно.

## shadcn MCP

Настройки проекта: `.codex/config.toml` для Codex и `.vscode/mcp.json` для
VS Code / GitHub Copilot. Используется установленный в проекте `shadcn`
из `node_modules`; перед подключением нужно установить зависимости через `pnpm install`.

Открывайте Wishu как корневую папку проекта. Запускайте Codex из этой папки:
конфигурация использует относительный путь к локальному CLI. Codex загружает
проектные настройки только для доверенных проектов. После добавления настроек
перезапустите клиент Codex. В VS Code откройте `.vscode/mcp.json` и нажмите Start
рядом с сервером shadcn.

MCP использует существующий `components.json`. Для стандартного реестра
shadcn/ui дополнительные настройки и токены не требуются.

Настройки добавлены без запуска MCP-сервера; подключение проверяет пользователь.

Документация: https://ui.shadcn.com/docs/mcp

## Серверная часть

В `server/` добавлена основа NestJS с PostgreSQL, проверкой окружения,
CORS, валидацией DTO и маршрутами `/api/health`, `/api/health/ready`.
Frontend и сервер объединены через pnpm workspace; frontend остался в `src/`.

Инструкция настройки окружения, локального запуска, Docker и ручной проверки:
[server/README.md](server/README.md).

Основные команды из корня: `pnpm dev:server`, `pnpm build:server`,
`pnpm start:server`, `pnpm typecheck:server`. Прежние `pnpm dev` и `pnpm build`
относятся к frontend.

## Совместный запуск UI и API

После настройки окружения и запуска PostgreSQL выполните из корня проекта:

```sh
pnpm dev:all
```

Команда параллельно запускает Vite и NestJS в режиме разработки, помечая
сообщения как UI и API. Ctrl+C останавливает оба процесса; завершение одного
процесса также останавливает второй. PostgreSQL запускается отдельно командой
`docker compose up -d postgres` и продолжает работать после остановки UI/API.
