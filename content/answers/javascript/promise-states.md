**Promise находится в состоянии pending, fulfilled или rejected.** `settled` объединяет fulfilled и rejected, а `resolved` не всегда означает fulfilled.

<!-- wishu:answer-block -->

### Состояние и результат

- Fulfilled хранит успешное значение, rejected - причину отказа.
- После перехода из pending итоговое состояние не меняется.
- Вызов `resolve(otherPromise)` связывает результат с другим Promise: внешний может ещё оставаться pending.
- Сам Promise не запускает работу «в другом потоке» и не имеет встроенного метода отмены.

<!-- wishu:answer-block -->

### Уточнение для собеседования

Executor конструктора вызывается синхронно, а реакции `then` выполняются через задания Promise. Возвращаемое значение executor не становится результатом Promise.
