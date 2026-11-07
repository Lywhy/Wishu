**Подстановки generic-класса не создают отдельный JavaScript-конструктор для каждого T. Статическое состояние общее для значения класса, поэтому параметр экземпляра нельзя произвольно использовать как тип отдельного static-хранилища.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Если состояние зависит от T, храните его на экземпляре или создайте специализированный контейнер через фабрику.
- Статический generic-метод может объявить собственный параметр типа.
- Не рассчитывайте на автоматический отдельный кеш для Box<string> и Box<number>.

#### Пример

```typescript
class Box<T> {
  constructor(public value: T) {}
  static of<U>(value: U): Box<U> {
    return new Box(value)
  }
}
const item = Box.of(1)
```

#### Для закрепления

- [Как generic-класс связывает тип полей и методов экземпляра?](/questions/ts-generic-classes)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/classes.html).
