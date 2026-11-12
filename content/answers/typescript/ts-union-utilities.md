**`Exclude<T, U>` исключает варианты T, совместимые с U, `Extract` оставляет такие варианты, `NonNullable` убирает `null` и `undefined`.** Это преобразования множества вариантов типа, а не фильтрация элементов массива или проверка значения.

<!-- wishu:answer-block -->

#### Как это работает

Они проверяют совместимость вариантов, а не произвольное вычитание значений: `Exclude<string, "a">` остаётся `string`, поскольку общий `string` не является отдельным литеральным вариантом "a". Для наглядного поведения с отсутствием предполагается strictNullChecks. Runtime-данные после преобразования всё равно нужно получать корректным кодом.

#### Пример

```typescript
type Value = "a" | "b" | null | undefined
type OnlyA = Extract<Value, "a"> // "a"
type WithoutA = Exclude<Value, "a"> // "b" | null | undefined
type Present = NonNullable<Value> // "a" | "b"
type StillString = Exclude<string, "a"> // string
```

#### Разбор примера

OnlyA выбирает конкретную ветвь «a», а WithoutA сохраняет остальные варианты исходного union. Общий `string` не перечисляет каждую строку отдельной ветвью, поэтому исключение одного литерала не создаёт «все строки кроме a». Для такого ограничения нужна реальная проверка или другая модель.

#### Источники

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/utility-types.html)
