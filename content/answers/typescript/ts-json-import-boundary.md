**Опция позволяет TypeScript учитывать JSON-модуль и выводить его форму. Допустимая runtime-загрузка, атрибуты импорта и формат модулей остаются вопросами выбранного host и конвейера.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Тип известного JSON-файла не является валидатором будущего JSON-ответа сервера.
- Если в данных важны литеральные значения, не считайте вывод из JSON безусловным эквивалентом as const.
- Согласуйте правила TypeScript с Node.js, браузером или bundler, который действительно загрузит ресурс.

#### Пример

```typescript
// При подходящем проекте:
// import settings from "./settings.json"
// Checker знает форму файла; runtime может требовать другую
// форму загрузки или import attributes.
```

#### Для закрепления

- [Как согласовать module, moduleResolution и aliases с реальной средой запуска?](/questions/ts-module-resolution)
- [Зачем импорту JSON атрибут with { type: "json" }?](/questions/js-json-module-attributes)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/tsconfig/resolveJsonModule.html).
