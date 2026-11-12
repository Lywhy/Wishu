**Условие с голым параметром T слева от `extends` применяется к каждому варианту union отдельно.** Например, `ToArray<string | number>` может дать `string`[] | `number`[]. Оборачивание обеих сторон в кортежи [T] `extends` [U] позволяет проверять тип целиком.

<!-- wishu:answer-block -->

#### Как это работает

`never` можно рассматривать как пустой union: дистрибутивная проверка T `extends` `never` не получает ни одного варианта и для T = `never` сама даёт `never`. Поэтому `IsNever<T>` обычно пишут через [T] `extends` [`never`]. Это правило конкретной формы conditional type, а не runtime-проверка существования значения.

#### Особые аргументы условного типа

`any` способен привести к объединению результатов обеих ветвей, `unknown` не доказывает соответствие `string`, а `never` исчезает при распределении. Эти случаи важны при написании собственных utilities.

```typescript
type Flag<T> = T extends string ? 1 : 2
type A = Flag<any> // 1 | 2
type B = Flag<unknown> // 2
type C = Flag<never> // never
```

#### Пример

```typescript
type ToArray<T> = T extends unknown ? T[] : never
type WholeArray<T> = [T] extends [unknown] ? T[] : never
type A = ToArray<string | number> // string[] | number[]
type B = WholeArray<string | number> // (string | number)[]
type Broken<T> = T extends never ? true : false
type IsNever<T> = [T] extends [never] ? true : false
type C = Broken<never> // never
type D = IsNever<never> // true
```

#### Разбор примера

ToArray создаёт отдельный массив для каждого варианта union, а WholeArray сначала рассматривает весь вход и получает массив смешанных элементов. У `Broken<never>` нет ветвей для распределения. Кортежная оболочка IsNever превращает это в единую проверку и позволяет получить true.

#### Для закрепления

- [Как any, unknown и never ведут себя в union и intersection?](/questions/ts-special-type-algebra)

#### Источники

[TypeScript: conditional-types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
