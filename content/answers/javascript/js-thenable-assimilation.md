**Алгоритм разрешения `Promise` не просто копирует поле value. Он обращается к `then` подходящего значения, обрабатывает ошибки получения/вызова и защищает завершение от повторных попыток.**

<!-- wishu:answer-block -->

### Как это работает

Обычный объект с методом `then` может участвовать в ожидании, даже не будучи `instanceof` Promise. Получение `then` может выполнить `getter` и бросить ошибку. Возврат того же разрешаемого `Promise` в соответствующем цикле приводит к ошибке, а не бесконечному успешному вложению.

Для собственных агрегаторов используйте `Promise.resolve`, а не наивный ручной вызов любого .then без протокольных гарантий.

### Пример и его разбор

```javascript
const thenable = {
  then(resolve, reject) {
    resolve(1)
    resolve(2)
    reject("поздно")
  },
}
Promise.resolve(thenable).then(console.log) // 1
const broken = Object.defineProperty({}, "then", {
  get() {
    throw new Error("getter")
  },
})
// Promise.resolve(broken) отклонится; ошибку нужно обработать.
```

Первое resolve(1) фиксирует исход показанного thenable, а последующие попытки завершения игнорируются. В другом объекте само чтение `then` уже вызывает `getter` и может завершиться ошибкой. Поэтому адаптация значений должна соблюдать весь протокол `Promise.resolve`, а не просто проверить существование поля и вызвать его вручную. Результат внешнего `Promise` всё равно нужно обработать.

### Типичная ошибка

> Реализовывать `Promise.all` через неконтролируемый value.then и двойной счётчик завершения.

### Источники

[MDN: Global_Objects/Promise/resolve](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)
