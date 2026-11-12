**Используйте `Array.isArray`(value): метод проверяет, является ли значение массивом. `typeof` [] возвращает "object" и не отличает массивы от других объектов.**

<!-- wishu:answer-block -->

### Как это работает

Наличие `length` или числовых ключей также не делает объект массивом. В отличие от `instanceof` Array, `Array.isArray` корректно распознаёт массивы из другого контекста выполнения.

Типизированные массивы, например `Uint8Array`, обычными массивами не являются и дают false.

### Пример и его разбор

```javascript
Array.isArray([]) // true
Array.isArray({ length: 0 }) // false
Array.isArray(new Uint8Array(2)) // false
typeof [] // "object"
```

Объект с `length` в примере лишь похож на коллекцию: внутреннего устройства массива у него нет. `Uint8Array` тоже представляет последовательность, но относится к другому семейству встроенных объектов. Поэтому `Array.isArray` возвращает `true` только для настоящего массива. После этой проверки всё ещё необходимо проверять допустимость его элементов и длины, если того требует задача.

### Источники

[MDN: Guide / Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators)
