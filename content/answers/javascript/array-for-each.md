**`forEach` вызывает callback для существующих элементов и возвращает `undefined`.**

<!-- wishu:answer-block -->

### Как это работает

Callback получает элемент, индекс и исходный массив; его возвращаемые значения не собираются. Это удобно, когда нужны действия для каждого элемента, а не новый массив результатов.

Break и continue из callback не управляют обходом `forEach`, а `return` завершает только текущий вызов callback. Для управляемого выхода подходит for...of, для проверки условия - `some` или every.

`forEach` пропускает отсутствующие позиции и не ожидает `Promise` от `async` callback. Последовательные асинхронные действия обычно оформляют через for...of с await.

### Пример и его разбор

```javascript
const visited = []
const result = [1, 2, 3].forEach((value) => {
  if (value === 2) return
  visited.push(value)
})
visited // [1, 3]
result // undefined
```

Возврат внутри callback при value, равном 2, пропускает только действие текущего вызова, а не завершает общий обход. Поэтому visited содержит 1 и 3, а result остаётся undefined. Когда нужно создать коллекцию результатов, подходит `Map`; когда важен управляемый выход или последовательное ожидание, удобнее явный цикл.

### Источники

[Документация](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
