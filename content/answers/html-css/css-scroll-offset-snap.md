**`scroll-padding` описывает внутреннюю удобную область скролл-контейнера, `scroll-margin` расширяет область цели.** Scroll snap отдельно задаёт привязку прокрутки к позициям элементов.

<!-- wishu:answer-block -->

#### Механизм и границы

- Отступ у цели помогает не спрятать заголовок под фиксированной шапкой при переходе к якорю. Он не добавляет обычный `margin` в layout.
- `proximity` предлагает привязку поблизости, `mandatory` требует её по правилам механизма. Выбирайте строгость так, чтобы длинное содержимое оставалось читаемым.
- `scroll-snap-align` задают детям, `scroll-snap-type` - контейнеру с реальной прокруткой. Физику движения определяет браузер.
- Смещения полезны и без включённого snapping. Не заменяйте ими корректные размеры и доступную клавиатурную навигацию.

#### Пример

```css
html {
  scroll-padding-block-start: 5rem;
}
h2[id] {
  scroll-margin-block-start: 1rem;
}
.cards {
  overflow-x: auto;
  scroll-snap-type: x proximity;
}
.cards > article {
  scroll-snap-align: start;
}
```

#### Для закрепления

- [Чем overflow: hidden отличается от clip, auto и scroll?](/questions/css-overflow-scroll-contract)

#### Источник

[W3C: css-scroll-snap-1](https://www.w3.org/TR/css-scroll-snap-1/).
