**`call` и `apply` сразу вызывают функцию с указанным thisArg и возвращают её результат. `call` принимает аргументы по отдельности: fn.call(context, a, b). `apply` принимает массивоподобный список: fn.apply(context, args).**

<!-- wishu:answer-block -->

### Как это работает

Spread при обычном вызове требует итерируемое значение; `apply` достаточно подходящих `length` и индексных свойств. Для строгой обычной функции thisArg сохраняется как передан; в нестрогой `null` и `undefined` заменяются глобальным объектом, а примитивы оборачиваются.

Стрелка игнорирует переданный thisArg, сохраняя лексический this. В отличие от `bind`, `call` и `apply` выполняют вызов немедленно.

### Пример и его разбор

```javascript
function total(a, b) {
  return this.base + a + b
}
const context = { base: 10 }
total.call(context, 2, 3) // 15
total.apply(context, [2, 3]) // 15
total.apply(context, { 0: 2, 1: 3, length: 2 }) // 15
```

Обе первые строки выполняют total с base, равным 10, и аргументами 2 и 3, поэтому дают одинаковые 15. Различается форма передачи списка, а не время вызова. Третий вызов показывает, что `apply` подходит массивоподобный объект с `length` и индексами, даже если у него нет итератора, необходимого для spread.

### Источники

[MDN: Function / call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
