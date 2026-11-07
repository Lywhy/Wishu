**Auto `margin` в основной оси поглощает положительное свободное место до `justify-content`.** `gap` задаёт промежутки между соседними элементами, а не внешний отступ контейнера.

<!-- wishu:answer-block -->

#### Механизм и границы

- margin-inline-start: `auto` у последнего элемента в обычном row может отделить правую группу действий без дополнительного spacer.
- Несколько auto-margin делят доступное место. Если свободного места нет, `auto` не создаёт его из ничего и не заменяет правила сжатия.
- Space-between распределяет остаток сверх размеров и `gap`. Поэтому расстояния могут быть больше указанного `gap`.
- Логическая сторона inline-start согласуется с направлением текста; при column ось и нужное свойство рассматривают отдельно.

#### Пример

```css
.toolbar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.toolbar .account {
  margin-inline-start: auto;
}
```

#### Для закрепления

- [Чем align-items, align-content и justify-content отличаются?](/questions/css-box-alignment)

#### Источник

[MDN: Box alignment in flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_alignment/Box_alignment_in_flexbox).
