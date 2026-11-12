**Utility types - готовые преобразования существующих типов.** `Partial<T>` делает свойства optional, `Required<T>` - обязательными, `Readonly<T>` запрещает запись через получившийся контракт. Они уменьшают повторение полей и помогают связать производные контракты с исходным.

<!-- wishu:answer-block -->

#### Как это работает

Это не функции над данными: `Required` не создаёт пропущенные поля, `Readonly` не вызывает freeze, `Partial` не удаляет значения. Обычно преобразуется верхний уровень, а вложенные объекты требуют отдельного решения. Обработка `undefined` у optional-полей связана с конкретным преобразованием и настройками; её нельзя заменять общим обещанием глубокой валидации.

#### `Readonly<Map>` и `ReadonlyMap`

`Readonly` меняет присваиваемость свойств, но не удаляет изменяющие методы коллекции. Для ограниченного интерфейса чтения используйте подходящий `ReadonlyMap`/`ReadonlySet`; сам исходный объект и другие aliases от этого не замораживаются.

```typescript
const source = new Map<string, number>()
const props: Readonly<Map<string, number>> = source
props.set("x", 1) // Метод остаётся доступным.
const view: ReadonlyMap<string, number> = source
// view.set("x", 2) // В таком интерфейсе метода нет.
```

#### Пример

```typescript
type User = { id: number; name: string }
type Patch = Partial<User>
type Snapshot = Readonly<User>
type Complete = Required<{ id?: number; name?: string }>
const patch: Patch = { name: "Аня" }
const complete: Complete = { id: 1, name: "Аня" }
```

#### Разбор примера

Patch разрешает передать только изменяемую часть формы, а Complete требует оба поля в создаваемом объекте. Преобразования не выполняют обновление данных сами. Для коллекций различие особенно заметно: `readonly`-свойство метода set всё ещё позволяет этот метод вызвать, в отличие от интерфейса ReadonlyMap.

#### Источники

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/utility-types.html)
