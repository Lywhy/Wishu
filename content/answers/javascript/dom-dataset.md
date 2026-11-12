_*Data-* позволяет хранить небольшие пользовательские данные на HTML-элементе._*

<!-- wishu:answer-block -->

### Как это работает

`dataset` предоставляет доступ через DOMStringMap: data-user-id соответствует dataset.userId. Значения хранятся как строки, поэтому присваивание числа не сохраняет числовой тип.

Для удаления используют delete element.dataset.key. Логические и числовые значения нужно преобразовывать по контракту данных: Boolean("`false`") даст `true`, поэтому для флага часто нужна явная проверка строки.

Атрибуты доступны коду и инструментам страницы, поэтому они не подходят для секретов и не заменяют полноценное состояние приложения.

### Пример и его разбор

```javascript
const button = document.createElement("button")
button.dataset.userId = 42
button.getAttribute("data-user-id") // "42"
button.dataset.enabled = "false"
const enabled = button.dataset.enabled === "true" // false
delete button.dataset.userId
```

Число 42 сохраняется как строка, а строка «`false`» остаётся непустой. Boolean над ней дал бы `true`, поэтому пример сравнивает её с явно согласованным «`true`». При чтении `dataset` приложение само восстанавливает нужные типы и проверяет допустимые значения.

### Источники

[MDN: API / Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
