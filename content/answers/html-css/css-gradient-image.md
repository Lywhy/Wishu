**CSS-gradient является изображением, а не обычным значением `color`.** Его используют там, где допустим image, например в `background-image`.

<!-- wishu:answer-block -->

#### Как это работает

- Linear-gradient задаёт изменение вдоль направления, radial-gradient - от центра, conic-gradient - по углу. Это разные геометрии.
- Остановки определяют места цветов. Совпадающие позиции или несколько позиций могут создавать резкие границы вместо плавного перехода.
- Градиент не требует отдельного файла, но сам не задаёт размер элемента и не гарантирует контраст текста на всех участках.

#### Пример

```css
.banner {
  background-color: #e8eef8;
  background-image: linear-gradient(90deg, #e8eef8 0%, #d7e4ff 100%);
}
/* color: linear-gradient(...) не является обычным цветом текста. */
```

#### Для закрепления

- [Как работают несколько background и чем cover отличается от contain?](/questions/css-background-layers)
- [Что дают oklch и color-mix и гарантируют ли они доступный контраст?](/questions/css-color-space-contrast)

#### Источник

[MDN: gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient).
