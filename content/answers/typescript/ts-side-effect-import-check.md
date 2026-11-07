**Опция помогает обнаруживать неразрешённые side-effect imports, которые иначе могли оставаться без ожидаемой диагностики. Для ресурсов нужны согласованные типовые декларации и реальный загрузчик.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Wildcard-декларация сообщает checker о формате импорта, но не создаёт файл и не подключает CSS в браузере.
- Чем шире объявление `*.css`, тем меньше оно доказывает о существовании конкретного ресурса.
- Эта проверка не заменяет bundler и не подтверждает все пути доставки ресурсов.

#### Пример

```typescript
// imports.d.ts
declare module "*.css" {}
// app.ts
// import "./theme.css"
// Файл должен реально обрабатываться средой сборки.
```

#### Для закрепления

- [Что описывают .d.ts и откуда TypeScript получает типы JavaScript-библиотеки?](/questions/ts-declaration-files)
- [Как согласовать module, moduleResolution и aliases с реальной средой запуска?](/questions/ts-module-resolution)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/tsconfig/noUncheckedSideEffectImports.html).
