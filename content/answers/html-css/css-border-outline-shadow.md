**Border входит в `border` box, `outline` и `box-shadow` обычно не увеличивают занимаемое в `normal` flow место.** Поэтому они по-разному подходят для рамки состояния.

<!-- wishu:answer-block -->

#### Как это работает

- При `content-box` новая `border` увеличит внешнюю коробку; при `border-box` она занимает часть заданного размера. Даже без увеличения коробки может измениться доступное место содержимому.
- Outline удобно показывает фокус без добавления рамки в `layout`. Он не является полноценной заменой `border` для всех декоративных задач.
- Shadow может перекрывать соседей и быть обрезана предком с `overflow`. Отсутствие влияния на поток не означает невидимость за пределами коробки.
- Если нужна `border` при выборе без скачка размеров, можно заранее зарезервировать её прозрачным цветом.

#### Пример

```css
.card {
  border: 2px solid transparent;
}
.card[data-selected="true"] {
  border-color: navy;
}
.card:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 3px;
}
```

#### Для закрепления

- [Чем content-box отличается от border-box?](/questions/css-box-sizing)
- [Как оформить focus-visible и не потерять клавиатурную доступность?](/questions/css-focus-indicator)

#### Источник

[MDN: outline](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/outline).
