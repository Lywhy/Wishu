**Имя класса в позиции типа обычно описывает экземпляр. Typeof от значения класса описывает конструктор и статические члены, а не поля отдельного созданного объекта.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Функция, принимающая экземпляр, не получает автоматически возможность вызвать new.
- Generic-класс имеет параметризованные экземпляры; статическое значение конструктора рассматривается отдельно.
- Для извлечения экземпляра из подходящего конструктора есть InstanceType.

#### Пример

```typescript
class User {
  static role = "user"
  constructor(public name: string) {}
}
const C: typeof User = User
const value: User = new C("Анна")
type Item = InstanceType<typeof User>
```

#### Для закрепления

- [Как описать тип функции через сигнатуру, type или interface?](/questions/ts-function-signatures)
- [Как извлечь параметры и результат функции либо конструктора?](/questions/ts-signature-utilities)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/classes.html).
