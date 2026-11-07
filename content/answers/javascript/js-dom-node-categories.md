**Node - общая категория DOM-узла. Element относится к элементам с атрибутами, а HTMLElement описывает HTML-элементы. Текст, комментарий и документ не становятся HTMLElement только потому, что находятся на странице.**

<!-- wishu:answer-block -->

### Механизм и границы

ChildNodes включает больше типов узлов, чем children. Внутри HTML могут существовать SVG-элементы с другим интерфейсом. Поэтому доступ к value, dataset или style требует подходящего контракта элемента.

Instanceof нужно применять с учётом realm, если узел пришёл из другого окна. TypeScript assertion не меняет реальный тип узла.

<!-- wishu:answer-block -->

### Источник

[MDN: Node](https://developer.mozilla.org/en-US/docs/Web/API/Node).
