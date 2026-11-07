**Тип пишется после всего шаблона деструктуризации. Запись двоеточия внутри самого шаблона обычно переименовывает извлекаемую переменную, а не задаёт ей тип.**

<!-- wishu:answer-block -->

#### Механизм и границы

- В `{ name: localName }` создаётся локальная переменная localName.
- Для большой формы используйте именованный тип параметра.
- Default для отдельного свойства и default для всего аргумента решают разные случаи отсутствия данных.

#### Пример

```typescript
type User = { name: string; age?: number }
function greet({ name: localName, age = 0 }: User) {
  return localName + ": " + age
}
```

#### Для закрепления

- [Как типизировать optional, default и rest-параметры?](/questions/ts-function-parameters)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/functions.html).
