**Подходящий homomorphic mapped type умеет преобразовать элементы кортежа, сохраняя его позиционную структуру и модификаторы. Произвольное переименование ключей не обязано сохранять тот же контракт.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Шаблон `[K in keyof T]` полезен для преобразования элементов без ручного перечисления позиций.
- Добавление as к ключам меняет задачу и может заставить обрабатывать массивные члены как объектные свойства.
- Не проверяйте только один пример с двумя полями: учитывайте readonly, массивы и кортежи разной формы.

#### Пример

```typescript
type Promised<T> = { [K in keyof T]: Promise<T[K]> }
type Pair = Promised<readonly [string, number]>
// readonly [Promise<string>, Promise<number>]
```

#### Для закрепления

- [Как mapped types преобразуют свойства и их модификаторы?](/questions/ts-mapped-types)
- [Как variadic tuple types сохраняют позиции при объединении аргументов?](/questions/ts-variadic-tuples)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html).
