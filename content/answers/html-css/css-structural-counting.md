**`:nth-child()` считает позицию среди элементов-соседей, `:nth-of-type()` - среди элементов того же типа.** Дополнение of S у nth-child сначала ограничивает набор селектором S.

<!-- wishu:answer-block -->

#### Механизм и границы

- .item:nth-child(2) требует, чтобы элемент был .item и вторым ребёнком, а не вторым .item. .item:nth-of-type(2) тоже не считает класс: учитывается имя тега.
- В :nth-child(2 of .item) считают только соседей, подходящих .item. Текстовые узлы и комментарии не занимают позиции.
- Формулы an+b позволяют выбирать ряды; odd и even - частные случаи. Для of S учитывайте поддержку целевых браузеров и специфичность аргумента.

#### Пример

```html
<div>
  <h2>Темы</h2>
  <p class="item">A</p>
  <p>Пояснение</p>
  <p class="item">B</p>
</div>
<!-- .item:nth-child(2) выберет A; :nth-child(2 of .item) выберет B. -->
```

#### Для закрепления

- [Как :is(), :where(), :not() и :has() влияют на выбор элементов и специфичность?](/questions/css-selector-functions)

#### Источник

[MDN: :nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:nth-child).
