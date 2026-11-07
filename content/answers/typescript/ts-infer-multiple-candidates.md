**Если один выводимый параметр встречается в нескольких местах шаблона, checker согласует кандидатов с учётом их позиций. Из ковариантных мест может получиться union, из контравариантных - intersection.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Поля-значения дают удобный пример объединения кандидатов.
- Параметры функций выражают требования к принимаемому значению, поэтому требуют иного согласования.
- Это правило вывода, а не runtime-преобразование. Пустое пересечение примитивов может стать never.

#### Пример

```typescript
type Values<T> = T extends { a: infer U; b: infer U } ? U : never
type V = Values<{ a: string; b: number }> // string | number
type Inputs<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void } ? U : never
type I = Inputs<{ a: (x: string) => void; b: (x: number) => void }> // never
```

#### Для закрепления

- [Как infer извлекает части типа, например параметры и результат функции?](/questions/ts-infer)
- [Как позиция параметра типа влияет на совместимость generic-контейнеров?](/questions/ts-generic-variance)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types).
