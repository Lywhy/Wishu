**Булев атрибут определяется присутствием, а не строкой true или false.** Чтобы отключение не действовало, атрибут `disabled` нужно убрать. У перечислимых атрибутов правила другие.

<!-- wishu:answer-block -->

#### Механизм и границы

- `disabled`, `required` и `checked` - примеры булевых атрибутов. Записи `disabled` и `disabled="disabled"` включают одно состояние; строка "false" не является способом его выключить.
- `contenteditable="false"` и `aria-expanded="false"` имеют значимую строку false. Нельзя обрабатывать все атрибуты одной булевой логикой.
- Атрибут `checked` задаёт исходное состояние; текущее состояние контрола читают через DOM-свойство `checked`. Отражение атрибутов в свойствах рассматривается отдельно в JavaScript.

#### Пример

```html
<!-- Всё ещё disabled -->
<input disabled="false" aria-label="Отключённое поле" />
<!-- Рабочее поле -->
<input aria-label="Доступное поле" />
<div contenteditable="false">Этот текст не редактируется.</div>
```

#### Для закрепления

- [Чем HTML-атрибут отличается от свойства DOM-элемента?](/questions/dom-attributes-properties)

#### Источник

[MDN: HTML](https://developer.mozilla.org/en-US/docs/Glossary/Boolean/HTML).
