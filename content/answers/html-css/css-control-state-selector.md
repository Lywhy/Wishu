**Псевдоклассы состояния отражают нативное состояние, атрибутные селекторы - наличие или значение атрибута.** После взаимодействия они могут расходиться.

<!-- wishu:answer-block -->

#### Как это работает

- У checkbox атрибут `checked` связан с исходным выбором. Пользователь может снять галочку, не удаляя атрибут: `:checked` перестанет совпадать, [`checked`] останется.
- Контрол внутри `disabled` `fieldset` может быть отключён без собственного disabled-атрибута. `:disabled` учитывает такое состояние, [`disabled`] у самого поля - нет.
- `aria-disabled="true"` не делает элемент нативно `:disabled`. Если нужен этот ARIA-контракт, стили и поведение согласуют отдельно.

#### Пример

```css
input:checked + span {
  font-weight: 700;
}
input:disabled {
  opacity: 0.6;
}
/* Состояния контролов, а не только исходные HTML-атрибуты. */
```

#### Для закрепления

- [Почему disabled="false" всё равно отключает поле?](/questions/html-boolean-enumerated-attributes)
- [Как сгруппировать radio-кнопки и зачем нужны fieldset и legend?](/questions/html-fieldset-radio-group)

#### Источник

[MDN: :checked](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:checked).
