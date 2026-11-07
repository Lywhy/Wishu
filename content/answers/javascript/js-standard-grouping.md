**Object.groupBy формирует группы по ключам свойств, а Map.groupBy сохраняет произвольные Map-ключи, в том числе объектную идентичность. Это разные контракты результата.**

<!-- wishu:answer-block -->

### Механизм и границы

Object.groupBy возвращает объект без обычного прототипа; обращение к его hasOwnProperty как к унаследованному методу ненадёжно. Группы содержат исходные элементы, а не глубокие копии.

Выбирайте Map, если ключ должен оставаться объектом, а не его строковым представлением. Проверяйте поддержку метода в целевой среде.

<!-- wishu:answer-block -->

### Источник

[MDN: Global_Objects/Object/groupBy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy).
