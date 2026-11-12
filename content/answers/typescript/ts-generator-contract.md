`Generator<Y, R, N>` разделяет значение yield, результат `return` и значение, принимаемое при продолжении через next. Это три разные роли, которые нельзя бездумно заменить одним типом.

<!-- wishu:answer-block -->

#### Как это работает

Результат next содержит признак done: при завершении value относится к `return`, иначе - к Yield. Проверяйте done, если типы различаются. Первый вызов next запускает генератор: переданное ему значение ещё не становится результатом какого-либо yield.

Обычный `Iterator` описывает протокол итерации, а `Generator` дополнительно представляет управляемый генератор. `AsyncGenerator` описывает асинхронный протокол: его next возвращает `Promise` результата итерации. Эти аннотации не меняют порядок исполнения JavaScript.

#### Пример

```typescript
function* ask(): Generator<string, number, boolean> {
  const accepted = yield "Продолжить?"
  return accepted ? 1 : 0
}
const dialog = ask()
dialog.next()
const done = dialog.next(true)
if (done.done) {
  const result: number = done.value
}
```

#### Разбор примера

Первый next доходит до вопроса и выдаёт string. Второй передаёт `true` в приостановленный yield, после чего генератор завершает работу числом 1. Проверка done позволяет отличить число завершения от строки промежуточной выдачи до использования value.

#### Типичная ошибка

> Считать типом результата генератора только тип выражений yield.

#### Источники

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-6.html)
