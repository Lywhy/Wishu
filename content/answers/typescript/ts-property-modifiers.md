**Свойство name?: `string` может отсутствовать; при чтении нужно учитывать `undefined`.** `readonly` запрещает переназначать свойство через данный тип, но не делает объект глубоко неизменяемым и не меняет его дескриптор JavaScript.

<!-- wishu:answer-block -->

#### Как это работает

При `exactOptionalPropertyTypes` отсутствие и явная запись `undefined` различаются: для последней требуется соответствующий union. Эта проверка включается отдельно от strict. `readonly`-ссылка может видеть изменения, выполненные через другую совместимую изменяемую ссылку. Для вложенного `readonly`-контракта нужно отдельно описать вложенные значения.

#### Отсутствует или записан `undefined`

С `exactOptionalPropertyTypes` `name?: string` разрешает отсутствие поля, но не запись undefined. Для явной записи нужен контракт `name?: string | undefined`. При чтении optional-поля `undefined` всё равно возможен. Это важно для patch-объектов, проверок через in и `Object.keys`: отсутствие и существующее поле с `undefined` наблюдаются по-разному.

```typescript
// exactOptionalPropertyTypes: true
type Patch = { name?: string }
const unchanged: Patch = {}
const renamed: Patch = { name: "Анна" }
// const cleared: Patch = { name: undefined } // Ошибка.
type ExplicitUndefined = { name?: string | undefined }
```

#### Пример

```typescript
type Settings = { readonly id: number; title?: string; nested: { count: number } }
const value: Settings = { id: 1, nested: { count: 0 } }
value.nested.count += 1 // разрешено
const title: string | undefined = value.title
// value.id = 2 не разрешается статическим контрактом.
```

#### Разбор примера

`readonly` у id запрещает присваивание через Settings, но nested остаётся обычным изменяемым объектом. Отсутствующий title при чтении даёт undefined. Здесь независимы три вопроса: можно ли пропустить поле, можно ли его переназначить и можно ли менять содержимое значения, на которое оно ссылается.

#### Источники

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/objects.html)
