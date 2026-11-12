**`Promise` находится в состоянии pending, fulfilled или rejected.** `settled` объединяет fulfilled и rejected, а `resolved` не всегда означает fulfilled.

<!-- wishu:answer-block -->

### Состояние и результат

Fulfilled хранит успешное значение, rejected - причину отказа. После перехода из pending итоговое состояние не меняется.

Вызов `resolve(otherPromise)` связывает результат с другим `Promise`: внешний может ещё оставаться pending. Сам `Promise` не запускает работу «в другом потоке» и не имеет встроенного метода отмены.

### Уточнение для собеседования

Executor конструктора вызывается синхронно, а реакции `then` выполняются через задания Promise. Возвращаемое значение executor не становится результатом Promise.

### Пример и его разбор

```javascript
let finish
const inner = new Promise((resolve) => {
  finish = resolve
})
const outer = new Promise((resolve) => resolve(inner))
outer.then((value) => console.log(value))
finish(42) // outer принимает результат inner; реакция выведет 42 позже
```

Outer принимает судьбу inner, но не получает готовое число сразу при resolve(inner). Пока inner ожидает finish, внешний результат тоже ещё не завершён. Вызов finish(42) даёт обоим успешный итог, а реакция `then` выполняется позже. Так различаются фиксация зависимости resolved и конечное состояние fulfilled либо rejected.

### Типичная ошибка

> Путать «resolve вызван» с «успешный результат уже получен».

### Источники

[MDN: Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
