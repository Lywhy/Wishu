**`typeof` возвращает строковое описание типа: например, "number", "string", "`undefined`", "`BigInt`" или "`Symbol`".**

<!-- wishu:answer-block -->

### Как это работает

Для большинства объектов результат - "object", для вызываемых функций - "function". Поэтому `typeof` не отличает массив от обычного объекта.

Результат `typeof null` равен "object" из-за исторической особенности языка; проверять `null` нужно сравнением value === `null`. `NaN` имеет тип number. Для необъявленного имени `typeof` обычно возвращает "`undefined`", но обращение к привязке в TDZ через `typeof` всё равно вызывает ReferenceError.

### Пример и его разбор

```javascript
typeof null // "object"
typeof NaN // "number"
typeof [] // "object"
typeof (() => {}) // "function"
Array.isArray([]) // true
```

Все результаты примера являются строками, описывающими наблюдаемую категорию значения. Сочетание `typeof` [] и `Array.isArray`([]) показывает, зачем проверки дополняют друг друга: первая относит значение к объектам, вторая подтверждает специальную природу массива. Историческое поведение `null` не следует переносить на его модель данных: это по-прежнему примитив.

### Источники

[MDN: Operators / typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
