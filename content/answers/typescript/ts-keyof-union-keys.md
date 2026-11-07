**Keyof объединения описывает ключи, с которыми можно обращаться к значению без знания его варианта. Чтобы собрать ключи каждого варианта, применяют отдельное распределение conditional type.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Union означает выбор одного варианта, поэтому уникальное поле другого варианта читать небезопасно.
- В `T extends unknown ? keyof T : never` naked-параметр T распределяет вычисление по членам.
- Для intersection доступен совместный набор требований; не переносите на него правило common keys.

#### Пример

```typescript
type A = { kind: "a"; a: string }
type B = { kind: "b"; b: number }
type Common = keyof (A | B) // "kind"
type Keys<T> = T extends unknown ? keyof T : never
type All = Keys<A | B> // "kind" | "a" | "b"
```

#### Для закрепления

- [Как keyof, T[K] и K extends keyof T типизируют доступ к свойству?](/questions/ts-keyof-indexed-access)
- [Как работает conditional type T extends U ? X : Y?](/questions/ts-conditional-types)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html).
