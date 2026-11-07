**Mapped type может оставить ключ, если его значение соответствует условию, и заменить ключ на never в остальных случаях. Нужно заранее решить, как учитывать undefined у optional-полей.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Проверка `T[K] extends string` не обязана сохранить `name?: string`, поскольку при чтении возможен undefined.
- Если условие предметно относится к непустой части типа, отдельно применяют NonNullable, осознавая изменение смысла.
- Полученный тип не фильтрует реальный объект; для новых данных нужна реализация преобразования.

#### Пример

```typescript
type Strings<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K]
}
type View = Strings<{ name: string; age: number; nick?: string }>
// Сохраняется name; nick требует отдельной политики.
```

#### Для закрепления

- [Как mapped types преобразуют свойства и их модификаторы?](/questions/ts-mapped-types)
- [Как optional и readonly меняют контракт свойства?](/questions/ts-property-modifiers)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html).
