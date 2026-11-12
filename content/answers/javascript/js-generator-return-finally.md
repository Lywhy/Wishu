**Да. Если обработка `return` входит в `finally`, а тот содержит `yield`, генератор может сначала выдать значение очистки с done: false. Возврат становится завершённым после соответствующего продолжения.**

<!-- wishu:answer-block -->

### Как это работает

Поэтому вызов `return` не следует считать гарантией, что любой генератор выполнил всю оставшуюся очистку без приостановки. `throw` тоже вводит управляющее завершение в точку приостановки и может попасть в catch.

Для ресурсного API не усложняйте `finally` неожиданной выдачей значений без документированного протокола.

### Пример и его разбор

```javascript
function* values() {
  try {
    yield 1
  } finally {
    yield "cleanup"
  }
}
const iterator = values()
iterator.next()
console.log(iterator.return("done")) // { value: "cleanup", done: false }
console.log(iterator.next()) // { value: "done", done: true }
```

`return` начинает завершение генератора, но сначала входит в finally. Находящийся там `yield` приостанавливает очистку и даёт done: false. Только следующий next завершает исходный возврат со значением «done», что важно для ресурсных итераторов.

### Типичная ошибка

> Всегда ожидать done: `true` от первого вызова return.

### Источники

[MDN: Global_Objects/Generator/return](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/return)
