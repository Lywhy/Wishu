**`Parameters<F>` получает кортеж параметров вызываемой сигнатуры, `ReturnType<F>` - её результат.** `ConstructorParameters<C>` получает параметры конструктора, `InstanceType<C>` - тип создаваемого экземпляра. Для значения функции или класса сначала нужен `typeof` в позиции типа.

<!-- wishu:answer-block -->

#### Как это работает

Эти helpers не вызывают функцию и не создают экземпляр. Для перегруженных контрактов обычно используется последняя доступная сигнатура, а не моделируется выбор по конкретным аргументам. Generic-функция без конкретной подстановки может дать менее точное извлечение. Конструкторный контракт и тип экземпляра нужно различать.

#### `this` и потеря связи

`ThisParameterType<F>` извлекает явно объявленный `this`-параметр, `OmitThisParameter<F>` получает вызываемую форму без него. При отсутствии явного `this` вывод может быть менее полезным; helper не выполняет runtime-bind.

Для перегрузок `Parameters` и `ReturnType` не восстанавливают таблицу выбора по произвольным аргументам. Для generic-функции извлечение отдельных входа и результата может потерять зависимость между ними. Проверьте, нужен ли вам весь полиморфный контракт, а не два независимых широких типа.

#### Извлечение не сохраняет универсальность

Универсальная зависимость между входом и выходом может потеряться, когда их извлекают отдельно. Если API должен оставаться полиморфным, сохраняйте generic-сигнатуру целиком, а не собирайте её из широких проекций.

```typescript
type Identity = <T>(value: T) => T
type Input = Parameters<Identity> // [value: unknown]
type Output = ReturnType<Identity> // unknown
```

#### Пример

```typescript
function format(id: number, active: boolean): string {
  return `${id}:${active}`
}
type Args = Parameters<typeof format> // [id: number, active: boolean]
type Result = ReturnType<typeof format> // string
class User {
  constructor(public name: string) {}
}
type ConstructorArgs = ConstructorParameters<typeof User> // [name: string]
type UserInstance = InstanceType<typeof User> // User
```

#### Разбор примера

`Parameters` сохраняет порядок id и active, а `ReturnType` получает `string` без вызова format. У User отдельно извлекаются аргументы конструктора и экземпляр. Эти проекции удобны для связанных API, но не заменяют полноценную generic-сигнатуру, если требуется сохранить зависимость входа и результата.

#### Для закрепления

- [Чем тип экземпляра класса отличается от typeof Class?](/questions/ts-constructor-instance-sides)

#### Источники

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/utility-types.html)
