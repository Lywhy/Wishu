**Element.style отражает inline-стиль элемента. `getComputedStyle` предоставляет разрешённые значения с учётом таблиц стилей и каскада, причём для некоторых свойств результат связан с использованным layout-значением.**

<!-- wishu:answer-block -->

### Как это работает

Пустой element.style.color не означает отсутствие цвета. Custom property читают через getPropertyValue, а не придуманное camelCase-поле. Не рассчитывайте, что результат вернёт исходную запись вроде rem или shorthand точно в авторском виде.

Чтение актуального стиля или геометрии может потребовать работы браузера. Измеряйте стоимость в реальном сценарии, а не утверждайте, что каждый вызов всегда делает полный reflow.

### Пример и его разбор

```javascript
function colorOf(element) {
  return getComputedStyle(element).color
}
function tokenOf(element) {
  return getComputedStyle(element).getPropertyValue("--accent").trim()
}
```

ColorOf учитывает действующий каскад, поэтому видит цвет и при отсутствии inline-записи. TokenOf читает custom property по её CSS-имени. Полученная строка описывает разрешённое значение и не обязана повторять исходную авторскую запись единиц или сокращений.

### Типичная ошибка

> Читать только element.style и заключать, что CSS-класс не применился.

### Источники

[MDN: Window/getComputedStyle](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle)
