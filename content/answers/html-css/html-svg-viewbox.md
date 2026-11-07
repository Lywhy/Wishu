**`viewBox` задаёт прямоугольник внутренней системы координат: min-x, min-y, `width`, `height`.** Внешние `width`/`height` или `CSS` задают размер viewport, в который этот прямоугольник отображается.

<!-- wishu:answer-block -->

#### Как это работает

- `viewBox`="0 0 24 24" не означает обязательные 24 CSS-пикселя на экране. Та же схема может отрисовываться в 48×48.
- preserveAspectRatio управляет сохранением пропорций и размещением при несовпадении форм viewport и `viewBox`. Это не увеличение детализации растрового содержимого.
- Если координаты фигуры лежат вне выбранного прямоугольника, результат может оказаться обрезанным или неожиданно сдвинутым. Проверьте систему координат, прежде чем добавлять случайный `transform`.

#### Пример

```html
<svg viewBox="0 0 100 50" width="200" height="100" aria-hidden="true">
  <rect x="0" y="0" width="100" height="50" fill="navy"></rect>
</svg>
```

#### Для закрепления

- [Чем inline SVG отличается от SVG в img?](/questions/html-svg-embedding)

#### Источник

[MDN: viewBox](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/viewBox).
