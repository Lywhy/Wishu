**Executor конструктора `Promise` вызывается синхронно при создании `Promise`; обработчики `then` выполняются позже.** Возвращённое executor значение игнорируется.

<!-- wishu:answer-block -->

### Почему `async` executor опасен

`async`-функция возвращает собственный `Promise`, который конструктор не использует как результат executor. Исключение `async` executor превращается в отклонение этого отдельного Promise. Внешний `Promise` может остаться pending, а ошибка - необработанной.

Для `Promise`-API используйте обычную `async`-функцию без лишнего `new` Promise. Конструктор нужен главным образом для адаптации callback-API.

### Пример и его разбор

```javascript
console.log("A")
const promise = new Promise((resolve) => {
  console.log("B")
  resolve("D")
})
promise.then(console.log)
console.log("C")
// A → B → C → D

async function load() {
  return await Promise.resolve(42)
} // вместо new Promise(async (...) => ...)
```

Сначала выводится A, затем executor немедленно выводит B. Resolve сохраняет успешный результат, но зарегистрированная реакция `then` ожидает своего шага, поэтому C появляется раньше D. Возвращаемое значение executor не участвует в этой связи. `async` executor создал бы ещё один `Promise` с независимым отказом, который конструктор не использует.

### Типичная ошибка

> Считать, что executor начнётся только при вызове `then` или что его `return` задаёт результат Promise.

### Источники

[MDN: Guide / Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
