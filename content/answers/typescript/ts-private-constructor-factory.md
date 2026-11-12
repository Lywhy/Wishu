**`private`-конструктор запрещает обычное создание через new в проверяемом внешнем TS-коде. Фабрика может централизовать нормализацию и проверку инвариантов.**

<!-- wishu:answer-block -->

#### Как это работает

Это ограничение доступа TypeScript, а не самостоятельная runtime-граница безопасности. В отличие от `abstract`, `private`-конструктор также ограничивает наследование снаружи класса.

Фабрика должна реально проверять вход; закрытое объявление конструктора не делает данные правильными само по себе.

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

#### Разбор примера

Create отклоняет NaN, бесконечности и неположительные числа до создания Positive. Приватный конструктор направляет обычный проверяемый код к этой фабрике. Надёжность инварианта создаётся конкретными проверками, а не только запретом внешнего new на уровне TypeScript.

#### Типичная ошибка

> Принимать `private` за runtime-валидацию или механизм авторизации.

#### Для закрепления

- [Как public, private и protected отличаются от JavaScript-приватности через #?](/questions/ts-class-visibility)
- [Для чего нужен abstract class и чем он отличается от интерфейса?](/questions/ts-abstract-classes)

#### Источники

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/classes.html)
