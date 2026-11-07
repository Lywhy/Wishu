**TypeScript различает контексты значений и типов. Некоторые объявления, например класс, создают сущности в обоих пространствах; type alias сам по себе не создаёт runtime-значение.**

<!-- wishu:answer-block -->

#### Механизм и границы

- В `const item: User` имя после двоеточия описывает тип. В `new User()` требуется реальный конструктор.
- Typeof в позиции типа связывает тип с уже существующим значением.
- Совпадение написания не означает, что можно вызвать интерфейс или применить instanceof к удалённому типу.

#### Пример

```typescript
interface Token {
  value: string
}
const Token = (value: string): Token => ({ value })
const item: Token = Token("ready")
```

#### Для закрепления

- [Чем typeof в позиции типа отличается от JavaScript-оператора typeof?](/questions/ts-type-query)
- [Что TypeScript добавляет к типизации полей, методов и конструктора класса?](/questions/ts-class-members)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/declaration-files/deep-dive.html).
