**Mix-blend-mode смешивает результат элемента с фоном позади него, а `isolation`: isolate создаёт изолированную группу.** Это помогает ограничить смешивание нужным компонентом.

<!-- wishu:answer-block -->

#### Как это работает

- Без подходящей границы текстовый эффект может зависеть от случайного фона внешней страницы. Isolate на обёртке делает границу намерения явной.
- Isolation создаёт stacking context, но не обрезает содержимое и не делает его модальным. Для этих задач нужны другие механизмы.
- Background-blend-mode смешивает слои фона одного элемента, а не задаёт тот же контракт для всех его потомков.
- Контраст проверяют по фактическому результату: смешивание может неожиданно ухудшить читаемость при смене изображения или темы.

#### Пример

```css
.artwork {
  isolation: isolate;
  background: white;
}
.artwork .overlay-text {
  mix-blend-mode: multiply;
}
```

#### Для закрепления

- [Почему большой z-index не поднимает элемент над соседним блоком?](/questions/css-position-stacking)
- [Что дают oklch и color-mix и гарантируют ли они доступный контраст?](/questions/css-color-space-contrast)

#### Источник

[MDN: isolation](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/isolation).
