**Includes проверяет наличие по SameValueZero, indexOf ищет индекс с другим правилом равенства, а предикатные методы находят элемент или позицию по условию. FindLast и findLastIndex обходят с конца.**

<!-- wishu:answer-block -->

### Механизм и границы

NaN обнаруживается через includes, но не обычным indexOf(NaN). Для предиката определите смысл отсутствия: найденное значение само может быть undefined, поэтому индекс иногда точнее.

Разрежённые массивы требуют отдельного внимания: разные методы не одинаково обрабатывают пустые позиции. Не выбирайте API только по краткости.

<!-- wishu:answer-block -->

### Для закрепления

- [Чем filter отличается от find?](/questions/array-filter-find)
- [Чем Object.is и SameValueZero отличаются от строгого равенства?](/questions/same-value-comparisons)

<!-- wishu:answer-block -->

### Источник

[MDN: Global_Objects/Array/includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes).
