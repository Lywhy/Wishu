**`Pick<T, K>` выбирает заданные ключи, `Omit<T, K>` исключает их из описания.** Это удобно для производных API-контрактов без повторения всех полей. Сами исходные объекты не меняются, а структурная совместимость может позволять хранить объект с дополнительными данными.

<!-- wishu:answer-block -->

#### Как это работает

Поэтому `Omit<User, "password">` не является реализацией безопасной сериализации. Чтобы действительно убрать поле, нужно создать соответствующий объект во время выполнения. У union-типов стандартный `Omit` не следует считать автоматически раздаваемой проекцией каждого варианта: при необходимости такое преобразование описывают явно.

#### `Omit` над union

Стандартный `Omit` не следует понимать как независимое преобразование каждой ветви union: в результате можно потерять поля, специфичные для вариантов. Если нужно сохранить варианты, распределите преобразование через conditional type с голым параметром.

```typescript
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never
type Entry =
  | { kind: "text"; text: string; internal: boolean }
  | { kind: "count"; count: number; internal: boolean }
type PublicEntry = DistributiveOmit<Entry, "internal">
```

Это всё ещё типовая проекция. Реальные internal-поля удаляет отдельный runtime-код.

#### Пример

```typescript
type User = { id: number; password: string }
const user: User = { id: 1, password: "example" }
const publicView: Pick<User, "id"> = user
Object.keys(publicView) // ["id", "password"]: данные не удалены
const publicData = { id: user.id } // реальная новая форма
```

#### Разбор примера

PublicView указывает на исходный user и лишь скрывает password из статического доступа. Поэтому `Object.keys` по-прежнему видит оба поля. PublicData действительно создаёт новую форму только с id; именно такой шаг нужен при исключении секретов из ответа API.

#### Источники

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/utility-types.html)
