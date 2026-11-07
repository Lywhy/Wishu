**`@starting-style` задаёт начальные значения для `transition`, когда у элемента нет подходящего предыдущего отображённого состояния.** Это позволяет сделать вход без искусственного второго рендера ради смены класса.

<!-- wishu:answer-block -->

#### Механизм и границы

- У нового DOM-элемента обычный `transition` не обязан начинаться с отдельно не показанного `opacity`: 0. Starting style даёт такое исходное состояние.
- Правило участвует в каскаде: расположение и специфичность важны. Пример показывает только вход по `opacity`, а не полный контракт закрытия.
- Для перехода `display` и выхода из top layer нужны дополнительные механизмы, например `transition-behavior`: `allow-discrete` и согласованная обработка overlay. Одного starting-style недостаточно.
- В неподдерживающей среде элемент должен сразу оставаться видимым. Основной стиль задают конечным, а reduced motion отключает ненужное движение.

#### Пример

```css
.notice {
  opacity: 1;
  transition: opacity 180ms ease;
}
@starting-style {
  .notice {
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .notice {
    transition: none;
  }
}
```

#### Для закрепления

- [Когда использовать transition, а когда animation?](/questions/css-transition-animation)

#### Источник

[MDN: @starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style).
