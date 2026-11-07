Если вызывающая сторона вправе передать любое Animal, обработчик только Dog не подходит: он может обратиться к отсутствующему свойству. При strictFunctionTypes параметры функциональных типов проверяются контравариантно.

<!-- wishu:answer-block -->

Возвращаемый тип обычно допускает более конкретный результат. Для параметра направление обратное: обработчик обязан принять все допустимые входы контракта. Это объясняется безопасностью вызова, а не правилом «больше полей всегда лучше».

**Важное исключение:** параметрам методов и конструкторных объявлений оставлены более мягкие правила совместимости. Поэтому `handle: (value: Animal) => void` и `handle(value: Animal): void` могут проверяться по-разному. Не используйте это исключение как доказательство runtime-безопасности.

<!-- wishu:answer-block -->

[Документация TypeScript](https://www.typescriptlang.org/tsconfig/strictFunctionTypes.html).

<!-- wishu:answer-block -->

### Синтаксис обработчика является частью проверки

Для callback-свойства явно выражайте функциональный тип, если нужен соответствующий строгий контроль параметра. Мягкость проверки method-синтаксиса не делает узкую реализацию безопасной для любого широкого входа.

```typescript
type Handler<T> = { handle: (value: T) => void }
type Methods<T> = { handle(value: T): void }
// Сравнивайте эти формы при включённом strictFunctionTypes.
```

#### Продолжить тему

- [Чем generic-callback отличается от callback с заранее выбранным типом?](/questions/ts-polymorphic-callback-contract)
- [Почему union функций не равен функции с union-параметром?](/questions/ts-union-of-functions)

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/type-compatibility.html).
