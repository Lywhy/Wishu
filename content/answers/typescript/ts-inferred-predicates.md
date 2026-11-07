**Начиная с TypeScript 5.5 некоторые простые проверки позволяют вывести предикат автоматически. Например, исключение undefined может дать массив оставшегося типа без ручного is.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Документированные условия включают единственный возврат без неявных возвратов, отсутствие изменения параметра и boolean-выражение, связанное с его уточнением.
- Явная аннотация boolean может убрать возможность вывода предиката.
- Проверка `!!value` для number | undefined не означает точное исключение undefined: ложная ветвь допускает и 0.

#### Пример

```typescript
const values: (number | undefined)[] = [0, 1, undefined]
const present = values.filter((value) => value !== undefined)
// В TS 5.5+ здесь number[].
```

#### Для закрепления

- [Как написать type guard с предикатом value is T?](/questions/ts-type-predicates)
- [Как TypeScript сужает тип через проверки и поток управления?](/questions/ts-control-flow-narrowing)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html).
