**Система совместимости TypeScript допускает некоторые удобные, но не полностью sound присваивания. Через более широкий изменяемый массив можно добавить значение, нарушающее ожидания узкого представления.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Присваивание не создаёт копию, обе переменные могут ссылаться на один массив.
- Для API чтения принимайте readonly-массив: такой контракт не предоставляет вызываемому коду push.
- Readonly не замораживает весь граф и не запрещает изменения через другие ссылки. Это ограничение доступных операций, а не runtime-защита.

#### Пример

```typescript
const numbers: number[] = [1]
const mixed: (number | string)[] = numbers
mixed.push("oops")
// numbers[1] теперь строка в runtime.
function read(values: readonly number[]) {
  return values.length
}
```

#### Для закрепления

- [Чем readonly T[] и ReadonlyArray<T> отличаются от изменяемого массива?](/questions/ts-readonly-arrays)
- [Как позиция параметра типа влияет на совместимость generic-контейнеров?](/questions/ts-generic-variance)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/type-compatibility.html).
