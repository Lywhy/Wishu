**Синхронный callback вызывается до завершения принимающей операции: например, `Map` вызывает функцию для элементов во время обхода.**

<!-- wishu:answer-block -->

### Как это работает

Асинхронный callback вызывается позже по правилам API: например, обработчик `setTimeout` запускается отдельной задачей, а `then` - микрозадачей. Само слово callback не определяет время выполнения.

`async` перед функцией означает возврат `Promise`, но не меняет правила принимающего API: до первого `await` тело начинает выполняться сразу. `forEach` не ожидает возвращённые Promise. Для последовательного ожидания подходит for...of с `await`, для параллельного - `Promise.all`(items.map(asyncCallback)).

Ошибки позднего callback нельзя перехватить одним try...catch вокруг его регистрации.

### Пример и его разбор

```javascript
const order = []
;[1].forEach(() => order.push("callback"))
order.push("после forEach")
order // ["callback", "после forEach"]

async function double(value) {
  return value * 2
}
const results = Promise.all([1, 2].map(double))
// results - Promise, который выполнится массивом [2, 4].
```

`forEach` успевает вызвать callback до записи «после `forEach`», поэтому порядок массива известен уже в текущем стеке. Функция double возвращает `Promise`, а `Map` собирает эти `Promise` без ожидания; только `Promise.all` создаёт общий ожидаемый результат. Следовательно, асинхронность самой функции и способность принимающего API ожидать её являются разными свойствами.

### Источники

[MDN: Guide / Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
