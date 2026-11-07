**Containment сообщает браузеру о границах зависимости `layout`, рисования или размеров.** Это не универсальный флаг «сделать быстрее»: каждый вид меняет поведение.

<!-- wishu:answer-block -->

#### Как это работает

- Paint containment ограничивает рисование потомков границей области и может обрезать выпадающий элемент. Layout containment создаёт независимый контекст с важными последствиями для позиционирования.
- Size containment требует рассчитывать размер без обычного вклада содержимого. Без внешнего размера или подходящего заместителя блок способен схлопнуться.
- Contain: `content` сочетает `layout`, `paint` и `style`, но не `size`. Strict включает и `size`. Style containment не означает запрет наследования всех CSS-стилей.
- Применяйте только при понятной границе. Content-visibility решает связанную, но другую задачу откладывания работы.

#### Пример

```css
.preview {
  contain: layout paint;
  inline-size: 20rem;
  min-block-size: 10rem;
}
/* Содержимое не должно рисоваться за пределами preview. */
```

#### Для закрепления

- [Что даёт content-visibility: auto и чем оно отличается от виртуализации?](/questions/css-content-visibility)
- [Относительно чего позиционируются absolute и fixed?](/questions/css-containing-block)

#### Источник

[MDN: contain](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/contain).
