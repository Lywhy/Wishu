**Для примитивных значений используют `string`, `number`, `boolean`, `bigint`, `symbol`, `null` и `undefined`.** `number` описывает и целые, и дробные числа JavaScript; отдельный стандартный тип int не появляется. `bigint` и `symbol` сохраняют смысл соответствующих значений JavaScript.

<!-- wishu:answer-block -->

#### Как это работает

Типы с заглавной буквы `string`, `number` и `boolean` описывают обёртки и обычно не нужны вместо примитивных аннотаций. Доступность `BigInt` и `Symbol` зависит от среды и настроек деклараций; типизация не добавляет runtime-реализацию. Unique `symbol` позволяет отдельно обозначить конкретную символьную идентичность.

#### Пример

```typescript
const label: string = "JS"
const amount: number = 3.5
const active: boolean = true
// В runtime с поддержкой BigInt:
const large: bigint = 9007199254740993n
const key: symbol = Symbol("key")
```

#### Разбор примера

Все значения примера остаются обычными примитивами JavaScript. Запись `number` не ограничивает amount целыми числами, а `symbol` не означает один заранее выбранный символ. Объектные обёртки меняют модель значения и потому не служат нейтральной заменой аннотациям со строчной буквы.

#### Источники

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
