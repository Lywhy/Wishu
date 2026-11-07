**Рекурсивному преобразованию нужны ограниченная область входов и достижимое условие завершения. Явный бюджет глубины помогает сделать контракт предсказуемее вместо бесконечного уточнения произвольной структуры.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Распределение по union способно многократно расширить работу на каждом шаге.
- Хвостовая форма некоторых conditional types оптимизируется, но это не отменяет лимиты и не гарантирует одинаковый предел для любой версии.
- При диагностике сначала уменьшайте пример и упрощайте модель; обход лимитов хитрым as не доказывает корректность результата.

#### Пример

```typescript
type Unwrap<T, Depth extends unknown[] = []> = Depth["length"] extends 8
  ? T
  : T extends readonly (infer U)[]
    ? Unwrap<U, [...Depth, unknown]>
    : T
type Item = Unwrap<string[][]> // string
```

#### Для закрепления

- [Как описывать рекурсивные типы и рекурсивные generic-структуры?](/questions/ts-recursive-types)
- [Как определить DeepReadonly и заранее ограничить область его применения?](/questions/ts-deep-readonly-contract)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#tail-recursion-elimination-on-conditional-types).
