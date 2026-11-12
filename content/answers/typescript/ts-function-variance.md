Если вызывающая сторона вправе передать любое Animal, обработчик только Dog не подходит: он может обратиться к отсутствующему свойству. При `strictFunctionTypes` параметры функциональных типов проверяются контравариантно.

<!-- wishu:answer-block -->

#### Как это работает

Возвращаемый тип обычно допускает более конкретный результат. Для параметра направление обратное: обработчик обязан принять все допустимые входы контракта. Это объясняется безопасностью вызова, а не правилом «больше полей всегда лучше».

**Важное исключение:** параметрам методов и конструкторных объявлений оставлены более мягкие правила совместимости. Поэтому `handle: (value: Animal) => void` и `handle(value: Animal): void` могут проверяться по-разному. Не используйте это исключение как доказательство runtime-безопасности.

#### Синтаксис обработчика является частью проверки

Для callback-свойства явно выражайте функциональный тип, если нужен соответствующий строгий контроль параметра. Мягкость проверки method-синтаксиса не делает узкую реализацию безопасной для любого широкого входа.

```typescript
type Handler<T> = { handle: (value: T) => void }
type Methods<T> = { handle(value: T): void }
// Сравнивайте эти формы при включённом strictFunctionTypes.
```

#### Пример

```typescript
type Animal = { name: string }
type Dog = Animal & { bark(): void }
const onlyDog = (dog: Dog) => dog.bark()
// const handle: (animal: Animal) => void = onlyDog
// Ошибка при strictFunctionTypes: обычное Animal не обязано иметь bark.
const acceptsAnimal = (animal: Animal) => animal.name
const handleDog: (dog: Dog) => string = acceptsAnimal
```

#### Разбор примера

OnlyDog рассчитывает на bark, которого у обычного Animal может не быть, поэтому широкому обработчику её подставлять небезопасно. Обратная замена работает: функция acceptsAnimal не требует ничего сверх имеющегося у Dog. Направление следует из допустимых вызовов, а не из количества полей в типе.

#### Типичная ошибка

> Считать обработчик более узкого подтипа безопасной заменой обработчику любого родителя.

#### Для закрепления

- [Чем generic-callback отличается от callback с заранее выбранным типом?](/questions/ts-polymorphic-callback-contract)
- [Почему union функций не равен функции с union-параметром?](/questions/ts-union-of-functions)

#### Источники

[Документация TypeScript](https://www.typescriptlang.org/tsconfig/strictFunctionTypes.html)

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)
