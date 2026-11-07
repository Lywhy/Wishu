**ListFormat соединяет элементы по правилам языка и выбранного типа списка, включая союз или альтернативу. Join использует один заданный разделитель и не знает грамматику языка.**

<!-- wishu:answer-block -->

### Механизм и границы

FormatToParts помогает отдельно отобразить элементы и разделители без ненадёжного разрезания результирующей строки. Не вставляйте пользовательский текст в HTML через конкатенацию только потому, что он прошёл formatter.

Для машинного CSV или протокольного формата нужен свой контракт escaping; ListFormat предназначен для представления человеку.

<!-- wishu:answer-block -->

### Источник

[MDN: Global_Objects/Intl/ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat).
