**Сначала создайте для каждого ключа отдельный объект с соответствующим типом значения, затем извлеките union этих объектов. Так связь не превращается в два независимых объединения.**

<!-- wishu:answer-block -->

#### Механизм и границы

- `key: keyof T; value: T[keyof T]` допускает смешивание ключа одного поля со значением другого.
- Промежуточный mapped type сохраняет корреляцию в каждом свойстве.
- После получения union для удобного использования полезна обязательная метка, по которой можно сузить вариант.
- Для optional-полей отдельно выберите политику undefined: -? убирает необязательность промежуточной записи, но не обязан исключить undefined из самого T[K].

#### Пример

```typescript
type Change<T> = {
  [K in keyof T]-?: { key: K; value: T[K] }
}[keyof T]
type UserChange = Change<{ name: string; age: number }>
// {key:"name";value:string} | {key:"age";value:number}
```

#### Для закрепления

- [Как keyof, T[K] и K extends keyof T типизируют доступ к свойству?](/questions/ts-keyof-indexed-access)
- [Как discriminated union помогает проверить полноту обработки вариантов?](/questions/ts-discriminated-unions)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html).
