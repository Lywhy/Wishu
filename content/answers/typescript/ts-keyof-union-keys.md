**`keyof` объединения описывает ключи, с которыми можно обращаться к значению без знания его варианта. Чтобы собрать ключи каждого варианта, применяют отдельное распределение conditional type.**

<!-- wishu:answer-block -->

#### Как это работает

Union означает выбор одного варианта, поэтому уникальное поле другого варианта читать небезопасно. В `T extends unknown ? keyof T : never` naked-параметр T распределяет вычисление по членам.

Для intersection доступен совместный набор требований; не переносите на него правило common keys.

#### Пример

```typescript
type A = { kind: "a"; a: string }
type B = { kind: "b"; b: number }
type Common = keyof (A | B) // "kind"
type Keys<T> = T extends unknown ? keyof T : never
type All = Keys<A | B> // "kind" | "a" | "b"
```

#### Разбор примера

Kind есть в обеих формах и доступен без проверки. Поле a принадлежит лишь A, поэтому не входит в Common. Keys распределяет вычисление отдельно и собирает все имена, но даже All не даёт права прочитать a у неизвестного B без сужения.

#### Типичная ошибка

> Считать `keyof` (A | B) простым объединением `keyof` A и `keyof` B.

#### Для закрепления

- [Как keyof, T[K] и K extends keyof T типизируют доступ к свойству?](/questions/ts-keyof-indexed-access)
- [Как работает conditional type T extends U ? X : Y?](/questions/ts-conditional-types)

#### Источники

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)
