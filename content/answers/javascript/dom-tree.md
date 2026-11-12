**HTML - язык разметки и исходный текст, а DOM - объектная модель разобранного документа.**

<!-- wishu:answer-block -->

### Как это работает

Дерево содержит Document, элементы, текстовые узлы, комментарии и другие типы узлов. JavaScript может читать и менять эту структуру через DOM API.

DOM может отличаться от исходного HTML: парсер исправляет некоторые структуры, а скрипты добавляют и удаляют узлы. Не каждый узел является Element: childNodes включает текст и комментарии, children - только дочерние элементы.

DOM и дерево отображения связаны, но не совпадают: наличие узла не гарантирует его видимость.

### Пример и его разбор

```javascript
const container = document.createElement("div")
container.append("текст", document.createElement("span"))
container.childNodes.length // 2
container.children.length // 1
container.firstChild.nodeType === Node.TEXT_NODE // true
```

В примере добавляются текст и span. Для childNodes это два узла, а для children только один элемент. Такое различие важно при обходе: попытка обращаться к каждому узлу как к элементу с атрибутами даст неверную модель документа.

### Источники

[MDN: API / Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
