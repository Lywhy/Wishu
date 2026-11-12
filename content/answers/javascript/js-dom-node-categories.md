**Node - общая категория DOM-узла. Element относится к элементам с атрибутами, а HTMLElement описывает HTML-элементы. Текст, комментарий и документ не становятся HTMLElement только потому, что находятся на странице.**

<!-- wishu:answer-block -->

### Как это работает

ChildNodes включает больше типов узлов, чем children. Внутри HTML могут существовать SVG-элементы с другим интерфейсом. Поэтому доступ к value, `dataset` или style требует подходящего контракта элемента.

`instanceof` нужно применять с учётом realm, если узел пришёл из другого окна. TypeScript assertion не меняет реальный тип узла.

### Пример и его разбор

```javascript
const block = document.createElement("div")
block.append("текст")
console.log(block.firstChild.nodeType === Node.TEXT_NODE) // true
console.log(block.children.length) // 0
```

Текстовый firstChild является Node, но не дочерним Element. Поэтому children.length остаётся нулём. Перед использованием специфичных полей вроде value выбирают подходящий тип элемента; приведение типа в TypeScript не меняет реальный объект браузера.

### Типичная ошибка

> Обращаться к каждому childNode как к элементу с нужными атрибутами и value.

### Источники

[MDN: Node](https://developer.mozilla.org/en-US/docs/Web/API/Node)
