**Mobile-first начинает с простой раскладки для узкого пространства и добавляет возможности при увеличении доступной ширины.** Desktop-first обычно задаёт широкую раскладку и упрощает её ниже границ.

<!-- wishu:answer-block -->

#### Как это работает

- В mobile-first часто используют min-width или диапазоны `width` >= ..., в desktop-first - max-width. Это стратегия каскада, а не запрет любого другого запроса.
- Узкий вариант помогает сначала сохранить главное содержимое и естественный порядок. Но доступность не появляется автоматически от названия подхода.
- Границу выбирают по поломке конкретного макета. У телефона в landscape и небольшой панели на большом экране могут быть похожие потребности.

#### Пример

```css
.cards {
  display: grid;
  gap: 1rem;
}
@media (min-width: 45rem) {
  .cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
```

#### Для закрепления

- [Как работают and, запятая, not и диапазоны в media queries?](/questions/css-media-query-logic)

#### Источник

[MDN: Responsive Design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design).
