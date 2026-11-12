**`async`-функция возвращает `Promise<T>`, где T - успешный результат ожидания.** Обычный `return` value внутри неё становится результатом Promise. Если результата нет, обычно используют `Promise<void>`; явно заданный `Promise<never>` подходит функции, которая не даёт успешного значения.

<!-- wishu:answer-block -->

#### Как это работает

`await` разворачивает ожидаемый результат согласно правилам `Promise`, а встроенный `Awaited` помогает выразить это на уровне типов. Аннотация `Promise<User>` не проверяет JSON и не описывает тип отклонения обычного `Promise`: исключение нужно обрабатывать отдельно. Входные данные сети всё равно нуждаются в runtime-проверке.

#### Что описывает результат ожидания

`Awaited<T>` моделирует разворачивание ожидания и распределяется по union; он учитывает не только прямой `Promise`, но и подходящие thenable-контракты. `ReturnType` `async`-функции возвращает сам `Promise`-контракт, поэтому для успешного ожидаемого результата часто нужны оба преобразования.

```typescript
async function load() {
  return { id: "u1" }
}
type Pending = ReturnType<typeof load> // Promise<{ id: string }>
type Loaded = Awaited<Pending> // { id: string }
```

`PromiseLike<T>` описывает thenable-протокол без обещания всех методов Promise. Ни `Promise<T>`, ни `Awaited<T>` не задают исчерпывающий тип выбрасываемых ошибок.

#### Однослойное извлечение и `Awaited`

Собственный helper, снимающий один `Promise`, не является полной моделью ожидания. Вложенные обещания и thenable требуют более полного контракта; в обычной проекции предпочтительнее стандартный Awaited.

```typescript
type First<T> = T extends Promise<infer U> ? U : T
type One = First<Promise<Promise<string>>> // Promise<string>
type Full = Awaited<Promise<Promise<string>>> // string
```

#### Пример

```typescript
async function double(value: number): Promise<number> {
  return value * 2
}
type Result = Awaited<ReturnType<typeof double>> // number
async function fail(): Promise<never> {
  throw new Error("нет успешного результата")
}
```

#### Разбор примера

`return` value * 2 формирует успешный результат `Promise<number>`, а `Awaited` вместе с `ReturnType` извлекает number. Fail имеет `Promise<never>`, потому что не выполняется успешно. Это не запрещает ей завершиться отклонением и не кодирует тип Error внутри generic-параметра Promise.

#### Для закрепления

- [Как сохранить разные типы результатов Promise.all по позициям?](/questions/ts-promise-all-tuples)

#### Источники

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/utility-types.html)
