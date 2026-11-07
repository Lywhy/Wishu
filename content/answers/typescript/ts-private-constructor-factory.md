**Private-конструктор запрещает обычное создание через new в проверяемом внешнем TS-коде. Фабрика может централизовать нормализацию и проверку инвариантов.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Это ограничение доступа TypeScript, а не самостоятельная runtime-граница безопасности.
- В отличие от abstract, private-конструктор также ограничивает наследование снаружи класса.
- Фабрика должна реально проверять вход; закрытое объявление конструктора не делает данные правильными само по себе.

#### Пример

```typescript
class Positive {
  private constructor(readonly value: number) {}
  static create(value: number) {
    if (!Number.isFinite(value) || value <= 0) throw new Error("Expected positive")
    return new Positive(value)
  }
}
```

#### Для закрепления

- [Как public, private и protected отличаются от JavaScript-приватности через #?](/questions/ts-class-visibility)
- [Для чего нужен abstract class и чем он отличается от интерфейса?](/questions/ts-abstract-classes)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/classes.html).
