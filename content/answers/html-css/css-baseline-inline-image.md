**Inline-изображение обычно выравнивается по baseline, а строка оставляет место под выносные элементы букв.** Зазор снизу не обязательно является `margin` картинки.

<!-- wishu:answer-block -->

#### Механизм и границы

- Для самостоятельного изображения `display`: block часто убирает участие в строке и соответствующий зазор. Для картинки рядом с текстом выбирают подходящий `vertical-align`.
- `vertical-align` относится к inline-level и table-cell контекстам, а не к произвольному блоку. Для центрирования обычной группы используют layout, например Flexbox.
- middle выравнивает относительно метрик строки, а не универсально по геометрическому центру родителя. Обнуление `line-height` у контейнера может повредить соседнему тексту.

#### Пример

```css
.standalone-image {
  display: block;
  max-inline-size: 100%;
}
.inline-icon {
  vertical-align: middle;
}
```

#### Для закрепления

- [Чем block, inline и inline-block отличаются в потоке документа?](/questions/css-display-formatting)

#### Источник

[MDN: vertical-align](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/vertical-align).
