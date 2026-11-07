**Результат: **[11, NaN, 3]**. Индекс элемента попадает во второй параметр parseInt - основание системы счисления.**

<!-- wishu:answer-block -->

### Механизм и границы

Map вызывает callback с value, index и array. Для первого элемента radix = 0 запускает обычное определение основания; для второго radix = 1 недопустим; для третьего radix = 2 строка 11 означает 3.

Исправление под выбранный контракт: `values.map(value => parseInt(value, 10))`. Number может быть альтернативой только при намерении преобразовать строку целиком, а не прочитать префикс.

<!-- wishu:answer-block -->

### Для закрепления

- [Как работает map и что возвращает его callback?](/questions/array-map)
- [Как различаются Number, parseInt и parseFloat при разборе строки?](/questions/js-numeric-parsing)

<!-- wishu:answer-block -->

### Источник

[ECMAScript: актуальный living draft](https://tc39.es/ecma262/).
