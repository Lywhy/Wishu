**`includes` возвращает boolean, а `indexOf` - индекс либо -1. Ноль является допустимым индексом найденной подстроки, поэтому проверка if (text.indexOf(query)) ошибочна.**

<!-- wishu:answer-block -->

### Как это работает

`startsWith` и `endsWith` выражают конкретное положение, не требуя регулярного выражения. Пустая подстрока имеет определённое поведение, которое нужно учитывать при пользовательском поиске.

Эти методы не выполняют автоматический поиск без регистра, нормализацию Unicode или сравнение по локали. Не добавляйте такие преобразования без определения требований.

### Пример и его разбор

```javascript
const text = "react"
console.log(text.indexOf("re")) // 0
console.log(text.includes("re")) // true
console.log(text.startsWith("re"), text.endsWith("ct")) // true, true
```

`indexOf` возвращает 0, поскольку совпадение находится в самом начале. Проверка этого числа как boolean ошибочно посчитала бы его отсутствием. `includes` сразу даёт нужный boolean, а `startsWith` и `endsWith` дополнительно выражают требование к позиции совпадения.

### Типичная ошибка

> Использовать индекс как truthy/falsy и перепутать найденное начало с отсутствием.

### Источники

[MDN: Global_Objects/String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
