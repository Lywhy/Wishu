**A & B требует соответствовать обоим типам одновременно.** Для объектов это удобно как новый составной контракт из type aliases и interfaces. Это не runtime-слияние и не оператор «последнее поле побеждает». Несовместимые типы одного свойства пересекаются, например `string` & `number` даёт `never`; некоторые несовместимые discriminant-поля сводят весь тип к `never`.

<!-- wishu:answer-block -->

#### Как это работает

В обычном пересечении data-свойств optional становится обязательным, если один контракт требует поле. `readonly` не обязательно побеждает: при совпадающем изменяемом объявлении составной тип может допускать запись. `readonly` вообще не означает runtime-заморозку. Для замены поля обычно яснее `Omit<Old, "key">` & New, чем надежда на перезапись через &.

#### Пример

```typescript
type Entity = { id: number } & { name: string }
const item: Entity = { id: 1, name: "JS" }
type Conflict = { value: string } & { value: number }
type Value = Conflict["value"] // never
type Combined = { readonly x?: number } & { x: number }
const point: Combined = { x: 1 }
point.x = 2 // изменяемый контракт сохраняет возможность записи
```

#### Разбор примера

Entity обязан одновременно иметь id и name. У Conflict одно поле должно быть и строкой, и числом, поэтому его допустимых значений нет. Если задача состоит в замене поля, пересечение исходных требований выражает другое намерение; сначала исключают старое поле, затем добавляют новое.

#### Источники

[TypeScript: everyday-types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
