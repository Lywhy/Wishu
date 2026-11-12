**Mapped type строит свойства по набору ключей, например [K in `keyof` T]: T[K].** Так создают новое представление существующего контракта без ручного повторения полей. Homomorphic-преобразования сохраняют соответствующие модификаторы, если явно не задать другое.

<!-- wishu:answer-block -->

#### Как это работает

`readonly` и ? можно добавить, а -`readonly` и -? - снять. Это статическое преобразование: оно не изменяет объект и не заполняет optional-поля. В современных mapped types возможно переименование ключей через as, но для базовых задач не нужно сразу усложнять выражение.

#### Переименование и исключение ключей

В mapped type часть `as` задаёт новое имя ключа. Если результатом для ключа становится `never`, соответствующее свойство исключается. Это позволяет связать производные имена с исходным контрактом, не дублируя список полей.

```typescript
type Getters<T> = {
  [K in keyof T as K extends string ? `get${Capitalize<K>}` : never]: () => T[K]
}
type UserGetters = Getters<{ name: string; age: number }>
// getName: () => string; getAge: () => number
```

Преобразование не создаёт реальных методов. Для `string`-only правила нужно явно определить судьбу числовых и символьных ключей.

#### Пример

```typescript
type MutableRequired<T> = {
  -readonly [K in keyof T]-?: T[K]
}
type Source = { readonly id: number; name?: string }
type Editable = MutableRequired<Source>
const value: Editable = { id: 1, name: "Аня" }
```

#### Разбор примера

MutableRequired проходит по ключам Source, снимает `readonly` у id и необязательность name. Создаваемый value обязан заполнить итоговую форму. Реальная старая запись Source при этом не получила бы name автоматически: преобразование описывает требование к данным, а не исполняет их обновление.

#### Источники

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
