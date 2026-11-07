**Метод может объявить предикат для this и сообщить checker, какое состояние объекта доказано при true. Проверка должна действительно обеспечивать обещанные поля и инварианты.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Это полезно для контейнеров с необязательным содержимым и состояниями готовности.
- Обычный boolean без подходящего вывода не обязательно создаёт такой же контракт вызывающего кода.
- Прежние ограничения guards сохраняются: ошибочное is может сделать последующий код небезопасным.

#### Пример

```typescript
class Holder {
  value?: string
  hasValue(): this is this & { value: string } {
    return this.value !== undefined
  }
}
const holder = new Holder()
if (holder.hasValue()) holder.value.toUpperCase()
```

#### Для закрепления

- [Как написать type guard с предикатом value is T?](/questions/ts-type-predicates)
- [Как сделать недопустимый порядок вызовов недоступным в типах API?](/questions/ts-typestate-api)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/classes.html).
