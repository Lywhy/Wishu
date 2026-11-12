**В современных версиях `infer` можно ограничить внутри шаблона, например `infer N extends number`. Для подходящей строковой формы checker способен получить числовой литеральный тип.**

<!-- wishu:answer-block -->

#### Как это работает

Улучшенное извлечение из template `string` types появилось в TS 4.8. Для более точного литерала важны правила разбора и обратного представления; не любая числовая строка превращается в единственный литерал.

Типовой разбор не проверяет неизвестную строку из сети и не выполняет `number` в runtime.

#### Пример

```typescript
type ParseNumber<S extends string> = S extends `${infer N extends number}` ? N : never
type Answer = ParseNumber<"42"> // 42
type Invalid = ParseNumber<"hello"> // never
```

#### Разбор примера

Для известной строки «42» шаблон выводит конкретное число 42, а «hello» не подходит и даёт never. Это удобно для вычислений над литеральными контрактами. При необычной записи числа точность вывода может быть другой, поэтому helper не следует описывать как универсальный runtime-парсер.

#### Типичная ошибка

> Обещать числовой литерал для любой произвольной строки.

#### Для закрепления

- [Как infer извлекает части типа, например параметры и результат функции?](/questions/ts-infer)
- [Как template literal types ограничивают формат строкового контракта?](/questions/ts-template-literal-patterns)

#### Источники

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-8.html#improved-inference-for-infer-types-in-template-string-types)
