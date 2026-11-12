**Параметр value?: T допускает пропуск и внутри обычно имеет тип T | `undefined`.** Параметр с default получает значение при пропуске или `undefined`; `null` default не запускает. Обязательные параметры нельзя просто располагать после optional, а default перед обязательным имеет отдельное правило вызова с явным `undefined`.

<!-- wishu:answer-block -->

#### Как это работает

Rest-параметр типизируют массивом либо кортежем, если нужна точность позиций. Он должен быть последним. Optional в callback означает право вызывающего кода не передать аргумент, а не только право реализации проигнорировать его. Контракт нужно описывать по реальному способу вызова.

#### Callback вправе игнорировать аргумент

Если API всегда передаёт индекс, объявляйте его обязательным. Реализация callback может не использовать параметр. Знак ? обещал бы другое: право самого вызывающего кода не передавать индекс.

```typescript
type Visit = (value: string, index: number) => void
const log: Visit = (value) => console.log(value)
log("a", 0)
```

#### Пример

```typescript
function greet(name?: string): string {
  return name ?? "гость"
}
function log(prefix = "app", ...messages: string[]): string {
  return [prefix, ...messages].join(": ")
}
function point(...coordinates: [number, number]): number {
  return coordinates[0] + coordinates[1]
}
```

#### Разбор примера

Greet самостоятельно обрабатывает возможный пропуск name. В log default выбирает prefix, а rest собирает остальные строки. Point использует кортеж rest-параметра, поэтому статический контракт требует ровно две числовые позиции вместо произвольного числа аргументов.

#### Для закрепления

- [Где записывать тип деструктурируемого параметра функции?](/questions/ts-destructured-parameter-annotation)

#### Источники

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/functions.html)
