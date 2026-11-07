**Условие с голым параметром T слева от extends применяется к каждому варианту union отдельно.** Например, `ToArray<string | number>` может дать string[] | number[]. Оборачивание обеих сторон в кортежи [T] extends [U] позволяет проверять тип целиком.

<!-- wishu:answer-block -->

- Never можно рассматривать как пустой union: дистрибутивная проверка T extends `never` не получает ни одного варианта и для T = `never` сама даёт `never`. Поэтому `IsNever<T>` обычно пишут через [T] extends [`never`]. Это правило конкретной формы conditional type, а не runtime-проверка существования значения.

<!-- wishu:answer-block -->

### Особые аргументы условного типа

Any способен привести к объединению результатов обеих ветвей, unknown не доказывает соответствие string, а never исчезает при распределении. Эти случаи важны при написании собственных utilities.

```typescript
type Flag<T> = T extends string ? 1 : 2
type A = Flag<any> // 1 | 2
type B = Flag<unknown> // 2
type C = Flag<never> // never
```

#### Продолжить тему

- [Как any, unknown и never ведут себя в union и intersection?](/questions/ts-special-type-algebra)

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html).
