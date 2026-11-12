**Window предоставляет окружение окна или вкладки: таймеры, навигацию и другие браузерные API.**

<!-- wishu:answer-block -->

### Как это работает

Document представляет загруженный документ и его DOM, доступный через window.document. Это разные объекты: окно связано с окружением, document - с содержимым.

В скриптах страницы window обычно доступен как глобальный объект через браузерный WindowProxy; globalThis позволяет обращаться к глобальному окружению переносимее. В Worker нет window и document.

При навигации документ может смениться, поэтому ссылки на старые узлы не являются вечной моделью страницы.

### Пример и его разбор

```javascript
window.document === document // true в скрипте страницы
document.createElement("div") // создание элемента текущего документа
window.setTimeout(() => console.log("позже"), 0)
// В Worker нельзя обращаться к window.document.
```

CreateElement работает с документом, а `setTimeout` планирует работу в окружении окна. Оба вызова доступны из скрипта страницы, но решают разные задачи. При переносе общей логики в Worker зависимости от DOM нужно отделять от вычислений.

### Источники

[MDN: API / Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
