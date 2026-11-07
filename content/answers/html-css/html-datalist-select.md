**Datalist предлагает варианты для `input`, но обычно не запрещает ввести собственный текст.** Select предназначен для выбора из заданных `option`.

<!-- wishu:answer-block -->

#### Как это работает

- Input связывают с `datalist` через `list` и `id`. Отправляется значение `input`, а не самостоятельное значение `datalist`.
- Если допустим только справочник, одних подсказок недостаточно: выбирайте соответствующий контрол и проверяйте данные.
- Представление вариантов и доступность `datalist` отличаются между браузерами и вспомогательными технологиями. Это не гарантированная замена полноценному combobox для сложного поиска.

#### Пример

```html
<label for="city">Город</label>
<input id="city" name="city" list="cities" />
<datalist id="cities">
  <option value="Москва"></option>
  <option value="Казань"></option>
</datalist>
```

#### Для закрепления

- [Как работают value, selected, multiple и optgroup у select?](/questions/html-select-options)

#### Источник

[MDN: datalist](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/datalist).
