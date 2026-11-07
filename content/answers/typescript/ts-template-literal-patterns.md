Шаблонные литеральные типы строят строковые типы из частей. Для конечных union они образуют набор комбинаций, а шаблон с общим string описывает семейство строк подходящей формы.

<!-- wishu:answer-block -->

Это полезно для имён событий, CSS-токенов и согласованных идентификаторов. В сочетании с conditional types и infer можно извлекать части подходящей строки.

Типовой шаблон не является полноценным runtime-парсером. Он не проверяет внешнюю строку автоматически и не гарантирует, например, корректность URL или реальность даты. Большое произведение union может сделать типы дорогими для checker; ограничивайте доменную задачу.

<!-- wishu:answer-block -->

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html).

<!-- wishu:answer-block -->

### Число комбинаций

Два небольших union дают произведение вариантов. До построения большой грамматики оцените её размер и цену для редактора; для крупных стабильных наборов может быть удобнее предварительная генерация.

```typescript
type Entity = "user" | "order"
type Action = "created" | "removed"
type Event = `${Entity}:${Action}` // Четыре варианта.
```

#### Продолжить тему

- [Как разрешить динамические свойства только с заданным префиксом?](/questions/ts-template-index-signatures)
- [Как infer с ограничением извлекает число из строкового литерала?](/questions/ts-template-number-inference)

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html).
