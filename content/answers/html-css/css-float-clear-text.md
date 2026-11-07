**Float позволяет текстовому содержимому обтекать коробку, `clear` ограничивает размещение рядом с предшествующими floats.** Это иная задача, чем ряд независимых flex-элементов.

<!-- wishu:answer-block -->

#### Как это работает

- Float у картинки в статье полезен для обтекания строками. Для основной сетки страницы чаще лучше Flexbox или Grid.
- Родитель может не получить ожидаемую высоту только из плавающих потомков. Display: flow-root создаёт отдельный BFC и помогает содержать их.
- Clear: both у последующего блока требует начать его ниже соответствующих floats. Это не универсальный способ сбросить любой `layout`.

#### Пример

```css
.article {
  display: flow-root;
}
.article img {
  float: inline-start;
  inline-size: 8rem;
  margin-inline-end: 1rem;
}
.next-section {
  clear: both;
}
```

#### Для закрепления

- [Когда вертикальные margin схлопываются и как помогает новый formatting context?](/questions/css-margin-collapse-bfc)

#### Источник

[MDN: float](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/float).
