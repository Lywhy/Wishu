**Content содержит данные, `padding` отделяет их от рамки, `border` окружает коробку, `margin` задаёт внешнее расстояние.** Padding находится внутри рамки, `margin` - снаружи.

<!-- wishu:answer-block -->

#### Как это работает

- Фон обычно покрывает содержимое и `padding` по правилам background-clip. Прозрачный `margin` не является окрашенной частью коробки.
- Padding не бывает отрицательным; `margin` может быть отрицательным и влиять на взаимное размещение. Вертикальные `margin` в некоторых контекстах схлопываются.
- Box-sizing определяет, входят ли `padding` и `border` в объявленную `width`. Это отдельный вопрос от того, зачем вообще нужны эти слои.

#### Пример

```css
.card {
  padding: 1rem;
  border: 1px solid #777;
  margin-block: 2rem;
}
/* Padding - место внутри рамки; margin - снаружи. */
```

#### Для закрепления

- [Чем content-box отличается от border-box?](/questions/css-box-sizing)
- [Когда вертикальные margin схлопываются и как помогает новый formatting context?](/questions/css-margin-collapse-bfc)

#### Источник

[MDN: Box model](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model).
