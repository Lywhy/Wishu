**`width` задаёт предпочтительный размер, `min-width` и `max-width` ограничивают его.** Если минимальная ширина больше максимальной, минимальное ограничение побеждает.

<!-- wishu:answer-block -->

#### Механизм и границы

- При `width`: 500px и `max-width`: 100% блок может стать уже 500px, если доступная база процента меньше. Padding и `border` учитываются по `box-sizing`.
- `min-width`: 600px при `max-width`: 100% может всё равно вызвать переполнение узкого контейнера. Max-width не является безусловным запретом любой большей ширины.
- У `flex`/grid-элементов автоматический минимум имеет специальные правила. Если мешает именно min-size: `auto`, применяют осознанное `min-inline-size`: 0, а не снимают все ограничения сразу.

#### Пример

```css
.article {
  box-sizing: border-box;
  inline-size: 50rem;
  max-inline-size: 100%;
  padding: 1rem;
}
```

#### Для закрепления

- [Чем content-box отличается от border-box?](/questions/css-box-sizing)
- [Почему flex-элемент не сжимается и ломает макет?](/questions/css-flex-min-size)

#### Источник

[MDN: min-width](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/min-width).
