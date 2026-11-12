**`keyof` T формирует допустимые ключи типа.** Indexed access T[K] получает тип свойства или union типов выбранных свойств. K `extends` `keyof` T связывает ключ с объектным контрактом и позволяет вернуть именно тип выбранного поля вместо слишком общего значения.

<!-- wishu:answer-block -->

#### Как это работает

Ключи могут быть строками, числами и символами, а индексная сигнатура влияет на результат `keyof`. Эти операторы не перечисляют runtime-объект и не доказывают, что внешние данные соответствуют T. Для optional-поля его возможный `undefined` остаётся частью соответствующего чтения.

#### Пример

```typescript
function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key]
}
const user = { id: 1, name: "Аня" }
const name = getProperty(user, "name") // string
type UserId = (typeof user)["id"] // number
```

#### Разбор примера

K выводится как конкретное имя «name», поэтому T[K] даёт `string` вместо общего union всех полей user. Ограничение не позволяет выбрать неизвестный ключ. Если поле optional, соответствующий результат всё равно будет учитывать `undefined`: generic-связь не устраняет возможное отсутствие.

#### Источники

[TypeScript: indexed-access-types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
