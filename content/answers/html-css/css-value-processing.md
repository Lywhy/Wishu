**Значение свойства проходит несколько стадий.** Каскад и defaulting определяют specified `value`, вычисления дают computed `value`, layout разрешает оставшиеся зависимости в used `value`, а отображение может внести ограничения actual `value`.

<!-- wishu:answer-block -->

#### Механизм и границы

- Не все относительные значения превращаются в пиксели на одном этапе. Например, процент ширины может сохраняться до расчёта относительно содержащего блока.
- Наследование обычно передаёт вычисленное значение родителя. Поэтому наследование абсолютной длины и безразмерного коэффициента может вести себя по-разному.
- `getComputedStyle` возвращает resolved values: для некоторых свойств это used `value`, а не буквальная строка из CSS или чистое computed `value` в смысле спецификации.
- При диагностике сравнивайте победившую декларацию, итог в панели Computed и геометрию элемента. Это три разных наблюдения.

#### Пример

```css
.parent {
  width: 400px;
}
.child {
  width: 50%;
  padding: 10px;
  box-sizing: content-box;
}
/* При этих условиях content width = 200px, border box шире из-за padding. */
```

#### Для закрепления

- [Чем content-box отличается от border-box?](/questions/css-box-sizing)
- [Почему element.style и getComputedStyle показывают разные вещи?](/questions/js-computed-style-contract)

#### Источник

[MDN: Property value processing](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Property_value_processing).
