**Адаптер вызывает исходную функцию с callback и переводит согласованный error-first исход в resolve/reject. Нужно сохранить `this` и понять, поддерживает ли исходный API один результат или множество событий.**

<!-- wishu:answer-block -->

### Как это работает

`Promise` допускает только одно завершение: многократный callback не становится потоком значений. Синхронная ошибка внутри executor превращается в отклонение, но ресурсы, отмена и тайм-аут сами не появляются.

Показанная функция предполагает конкретную конвенцию callback(error, value). Для другого API нужна другая адаптация.

### Пример и его разбор

```javascript
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn.call(this, ...args, (error, value) => {
        if (error) reject(error)
        else resolve(value)
      })
    })
  }
}
```

Возвращённая обычная функция сохраняет `this` вызывающего кода и передаёт его исходной fn. Callback затем выбирает resolve либо reject по согласованному error-first контракту. Для API, которое выдаёт много событий, это было бы потерей модели: `Promise` фиксирует только один исход. Отмена и снятие подписок также требуют отдельной реализации.

### Типичная ошибка

> Превращать поток событий в один `Promise` и терять все последующие значения.

### Источники

[MDN: Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
