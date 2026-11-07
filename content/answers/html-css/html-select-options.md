**`select` передаёт значение выбранного option под своим `name`.** `selected` задаёт исходный выбор, `multiple` разрешает несколько вариантов, `optgroup` группирует их визуально и семантически.

<!-- wishu:answer-block -->

#### Механизм и границы

- Если `value` у option не задан, значение выводится из его текста. Явное `value` отделяет стабильный машинный код от переводимой подписи.
- Для обязательного одиночного выбора распространён первый вариант с `value=""`. Нельзя считать произвольную надпись «Выберите» специальным placeholder-атрибутом.
- У `multiple` отправляются повторяющиеся записи с одним `name`: их читают как коллекцию. Текущее состояние хранится в DOM, а не обязательно в неизменённом атрибуте `selected`.

#### Пример

```html
<label for="level">Уровень</label>
<select id="level" name="level" required>
  <option value="">Выберите уровень</option>
  <optgroup label="Frontend">
    <option value="junior">Начальный</option>
    <option value="middle">Средний</option>
  </optgroup>
</select>
```

#### Для закрепления

- [Какие поля попадают в данные формы и почему disabled отличается от readonly?](/questions/html-form-entry-list)

#### Источник

[MDN: select](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select).
