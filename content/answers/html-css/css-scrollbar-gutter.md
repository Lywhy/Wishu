**`scrollbar-gutter`: stable резервирует место под классическую полосу прокрутки в подходящем контейнере.** Это уменьшает изменение доступной ширины, когда содержимого становится больше.

<!-- wishu:answer-block -->

#### Механизм и границы

- Свойство не создаёт прокрутку само и не устраняет её причину. У контейнера всё ещё должны быть корректные размеры и `overflow`.
- Overlay-scrollbars рисуются поверх содержимого и обычно не занимают gutter. Поэтому резервирование зависит от режима браузера и ОС.
- `both-edges` может добавить симметричный резерв с противоположной стороны. Это не означает две рабочие полосы прокрутки.
- Не фиксируйте ширину страницы компенсацией вроде 17px: размер системной полосы меняется по средам.

#### Пример

```css
html {
  scrollbar-gutter: stable;
}
.results {
  max-block-size: 24rem;
  overflow-y: auto;
  scrollbar-gutter: stable;
}
```

#### Для закрепления

- [Чем overflow: hidden отличается от clip, auto и scroll?](/questions/css-overflow-scroll-contract)

#### Источник

[MDN: scrollbar-gutter](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scrollbar-gutter).
