**Element.style отражает inline-стиль элемента. GetComputedStyle предоставляет разрешённые значения с учётом таблиц стилей и каскада, причём для некоторых свойств результат связан с использованным layout-значением.**

<!-- wishu:answer-block -->

### Механизм и границы

Пустой element.style.color не означает отсутствие цвета. Custom property читают через getPropertyValue, а не придуманное camelCase-поле. Не рассчитывайте, что результат вернёт исходную запись вроде rem или shorthand точно в авторском виде.

Чтение актуального стиля или геометрии может потребовать работы браузера. Измеряйте стоимость в реальном сценарии, а не утверждайте, что каждый вызов всегда делает полный reflow.

<!-- wishu:answer-block -->

### Источник

[MDN: Window/getComputedStyle](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle).
