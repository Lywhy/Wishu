**Литеральный тип описывает конкретное значение, например "ready", 200 или true.** Union таких типов задаёт ограниченный набор вариантов. Это удобно для статусов и параметров API, где произвольная строка была бы слишком широкой.

<!-- wishu:answer-block -->

#### Как это работает

TypeScript может расширять литералы в изменяемых данных. `as const` предотвращает такое расширение в соответствующем литеральном выражении, делает объектные свойства `readonly` и массивы `readonly`-кортежами. Это только статическое представление: оно не вызывает `Object.freeze` и не превращает все внешние вложенные ссылки в неизменяемые объекты.

#### Вложенная внешняя ссылка

Const assertion на литерале не замораживает ранее созданный объект или массив, попавший внутрь по ссылке. Следует различать `readonly`-свойство, неизменяемый тип вложенного контейнера и runtime-заморозку.

```typescript
const shared: number[] = [1]
const view = { items: shared } as const
shared.push(2)
view.items.push(3) // items - readonly-свойство, но его значение всё ещё number[].
// view.items = [] // Переназначение readonly-свойства запрещено.
```

#### Const привязки и литеральность свойства

Const не запрещает менять поле обычного объекта, поэтому поле может расшириться до string. Если протокол требует точного значения, выберите явный контракт или const assertion, учитывая его `readonly`-эффект.

```typescript
const options = { method: "GET" }
options.method = "POST"
const fixed = { method: "GET" } as const
// fixed.method = "POST" // Не соответствует контракту.
```

#### Пример

```typescript
type Status = "loading" | "ready" | "error"
const status: Status = "ready"
const response = { status: "ready", code: 200 } as const
type ResponseStatus = typeof response.status // "ready"
const coordinates = [10, 20] as const // readonly [10, 20]
```

#### Разбор примера

ResponseStatus получает единственный вариант «ready», потому что const assertion сохраняет точное поле response.status. Кортеж coordinates также сохраняет позиции и значения. Это удобно для ограниченного протокола, но данные не замораживаются в памяти и могут оставаться связанными с внешними изменяемыми объектами.

#### Источники

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
