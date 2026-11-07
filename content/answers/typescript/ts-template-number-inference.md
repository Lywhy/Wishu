**В современных версиях infer можно ограничить внутри шаблона, например `infer N extends number`. Для подходящей строковой формы checker способен получить числовой литеральный тип.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Улучшенное извлечение из template string types появилось в TS 4.8.
- Для более точного литерала важны правила разбора и обратного представления; не любая числовая строка превращается в единственный литерал.
- Типовой разбор не проверяет неизвестную строку из сети и не выполняет Number в runtime.

#### Пример

```typescript
type ParseNumber<S extends string> = S extends `${infer N extends number}` ? N : never
type Answer = ParseNumber<"42"> // 42
type Invalid = ParseNumber<"hello"> // never
```

#### Для закрепления

- [Как infer извлекает части типа, например параметры и результат функции?](/questions/ts-infer)
- [Как template literal types ограничивают формат строкового контракта?](/questions/ts-template-literal-patterns)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-8.html#improved-inference-for-infer-types-in-template-string-types).
