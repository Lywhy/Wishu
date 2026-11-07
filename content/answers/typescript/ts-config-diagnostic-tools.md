**Нужно выяснить, какие параметры реально применены, почему файл попал в программу и куда разрешён спецификатор. Эти вопросы решаются разными диагностическими режимами.**

<!-- wishu:answer-block -->

#### Механизм и границы

- ShowConfig показывает итоговую конфигурацию после наследования.
- ExplainFiles помогает понять присутствие файлов, traceResolution - поиск модулей и деклараций.
- Сначала сократите область диагностики и сохраните существенный фрагмент; огромный лог без конкретного вопроса мало помогает.

#### Пример

```typescript
// tsc -p tsconfig.json --showConfig
// tsc -p tsconfig.json --explainFiles
// tsc -p tsconfig.json --traceResolution
// Это примеры команд; здесь они не запускались.
```

#### Для закрепления

- [Как согласовать module, moduleResolution и aliases с реальной средой запуска?](/questions/ts-module-resolution)
- [Как types и typeRoots помогают контролировать глобальные типы окружения?](/questions/ts-ambient-types-scope)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/tsconfig/).
