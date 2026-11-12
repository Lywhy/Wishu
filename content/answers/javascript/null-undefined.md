**`undefined` обычно появляется, когда значение не задано: у переменной без инициализатора, отсутствующего свойства, пропущенного аргумента или результата функции без return. `null` обычно присваивают явно, чтобы обозначить отсутствие значения по договорённости в данных.**

<!-- wishu:answer-block -->

### Как это работает

Это разные примитивные значения: `null` === `undefined` возвращает `false`, а `null` == `undefined` - true. Оба значения falsy, но Number(`null`) даёт 0, а Number(`undefined`) - `NaN`. `typeof null` исторически возвращает "object", хотя `null` не является объектом.

### Пример и его разбор

```javascript
let value
value // undefined
const selectedUser = null
null === undefined // false
null == undefined // true
```

В примере переменная value существует, но значение ей ещё не присвоено, поэтому чтение даёт undefined. selectedUser, напротив, явно содержит null. Эти ситуации могут означать разные состояния интерфейса: данные ещё не загружены или пользователь действительно не выбран. Результаты сравнений показывают правила языка, но смысл отсутствия значения приложение задаёт своим контрактом.

### Источники

[MDN: Global Objects / undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)
