**Радиокнопки одной группы используют одинаковое `name`, а `fieldset` и `legend` объясняют общий вопрос.** Каждой кнопке всё равно нужна собственная подпись.

<!-- wishu:answer-block -->

#### Механизм и границы

- В обычном случае radio с одинаковым именем и одним владельцем-формой образуют выбор одного значения. Различайте группы между формами и деревьями.
- Значение `value` определяет отправляемый вариант; `id` связывает конкретный контрол с `label`. Общая `legend` не заменяет подписи вариантов.
- `disabled` у `fieldset` отключает вложенные контролы с особым исключением для содержимого первого `legend`. Выключение группы не должно случайно выключать нужный переключатель в легенде.

#### Пример

```html
<fieldset>
  <legend>Способ связи</legend>
  <label><input type="radio" name="contact" value="email" />Почта</label>
  <label><input type="radio" name="contact" value="phone" />Телефон</label>
</fieldset>
```

#### Для закрепления

- [Почему placeholder не заменяет label у поля?](/questions/html-form-label)
- [Какие поля попадают в данные формы и почему disabled отличается от readonly?](/questions/html-form-entry-list)

#### Источник

[MDN: fieldset](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/fieldset).
