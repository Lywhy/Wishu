**Text-align выравнивает inline-содержимое внутри строк контейнера.** Он не переносит сам блочный контейнер в центр родителя.

<!-- wishu:answer-block -->

#### Как это работает

- Текст и inline-изображение могут реагировать на `text-align`. Для положения блочной коробки выбирают `margin` или `layout` родителя.
- Start и end следуют направлению письма, left и right задают физические стороны. Justify распределяет промежутки и может ухудшить чтение в узком столбце.
- Вертикальное выравнивание этим свойством не настраивают. Text-align: center и align-items: center относятся к разным моделям.

#### Пример

```css
.heading {
  text-align: center;
}
.article {
  max-inline-size: 60rem;
  margin-inline: auto;
}
/* Первая строка центрирует текст, вторая - ограниченный блок. */
```

#### Для закрепления

- [Как центрировать блочный контейнер и почему margin: auto может быть незаметен?](/questions/css-block-horizontal-center)

#### Источник

[MDN: text-align](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-align).
