**`includes` проверяет наличие по SameValueZero, `indexOf` ищет индекс с другим правилом равенства, а предикатные методы находят элемент или позицию по условию. FindLast и findLastIndex обходят с конца.**

<!-- wishu:answer-block -->

### Как это работает

`NaN` обнаруживается через `includes`, но не обычным `indexOf`(`NaN`). Для предиката определите смысл отсутствия: найденное значение само может быть `undefined`, поэтому индекс иногда точнее.

Разрежённые массивы требуют отдельного внимания: разные методы не одинаково обрабатывают пустые позиции. Не выбирайте API только по краткости.

### Пример и его разбор

```javascript
const values = [NaN, 1, 2, 1]
console.log(values.includes(NaN)) // true
console.log(values.indexOf(NaN)) // -1
console.log(values.findLastIndex((value) => value === 1)) // 3
```

`includes` находит `NaN` по SameValueZero, а `indexOf` не находит его по строгому равенству. FindLastIndex начинает с конца и возвращает индекс 3 для последней единицы. Здесь различаются одновременно направление, способ сравнения и тип результата. Если нужно отличить отсутствие от элемента `undefined`, позиционный результат обычно даёт более ясный контракт.

### Типичная ошибка

> Считать `includes` полной boolean-обёрткой над `indexOf` для любого значения.

### Для закрепления

- [Чем filter отличается от find?](/questions/array-filter-find)
- [Чем Object.is и SameValueZero отличаются от строгого равенства?](/questions/same-value-comparisons)

### Источники

[MDN: Global_Objects/Array/includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
