**Кортеж сохраняет позиционные сведения, но извлечение через T[number] даёт union типов элементов. Это не тот же тип, что сам упорядоченный набор.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Length фиксированного кортежа может быть числовым литералом; optional-позиции создают несколько возможных длин.
- Keyof кортежа включает не только собственные позиции, но и массивные члены, поэтому его нельзя без уточнения считать списком индексов.
- Динамический number-индекс теряет точную связь конкретной позиции и её значения.

#### Пример

```typescript
type Pair = readonly [string, number]
type Size = Pair["length"] // 2
type Item = Pair[number] // string | number
type First = Pair[0] // string
```

#### Для закрепления

- [Что такое кортеж и чем он отличается от массива?](/questions/ts-tuples)
- [Как variadic tuple types сохраняют позиции при объединении аргументов?](/questions/ts-variadic-tuples)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/objects.html).
