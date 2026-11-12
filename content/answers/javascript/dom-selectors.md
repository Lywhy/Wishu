**`querySelector` возвращает первый Element по CSS-селектору или `null`, `querySelectorAll` - статический NodeList совпадений.**

<!-- wishu:answer-block -->

### Как это работает

`getElementById` ищет элемент по ID без синтаксиса CSS. Запрос можно ограничить контейнером, чтобы не затрагивать другие части документа.

Статический NodeList не обновляет состав после изменения DOM. Некоторые другие API, например getElementsByClassName, возвращают живую коллекцию.

NodeList не обязательно массив, хотя обычно допускает for...of; `Array.from` даёт методы массива. Динамическую часть CSS-селектора нужно корректно экранировать через CSS.escape, если она не является готовым селектором.

### Пример и его разбор

```javascript
function findItems(container) {
  const nodes = container.querySelectorAll("[data-item]")
  return Array.from(nodes).map((node) => node.textContent)
}
const selected = document.querySelector("#missing-element")
// Перед доступом к свойствам selected проверяют на null.
```

`querySelectorAll` фиксирует найденный набор в момент запроса. `Array.from` превращает его в массив для `Map`, но не подписывает на будущие изменения DOM. Отдельный `querySelector` может вернуть `null`, поэтому наличие результата проверяют до чтения его полей.

### Источники

[MDN: API / Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
