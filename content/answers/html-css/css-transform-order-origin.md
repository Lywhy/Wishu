**Преобразования не коммутативны: их перестановка меняет итог.** Transform-origin задаёт точку, относительно которой выполняются, например, вращение и масштабирование.

<!-- wishu:answer-block -->

#### Как это работает

- Список `transform` описывает композицию матриц. Для фиксированной точки итоговое применение удобно читать справа налево; это не последовательные изменения `normal` flow.
- Rotate затем translate в записи не равен translate затем rotate: меняется система координат смещения.
- Origin по умолчанию связан с центром обычной CSS-коробки. Его настройка полезна для раскрытия от края, но не резервирует место под увеличенный результат.
- Итоговая геометрия может перекрыть соседей: размер и положение в потоке рассматривают отдельно.

#### Пример

```css
.a {
  transform: translateX(80px) rotate(90deg);
}
.b {
  transform: rotate(90deg) translateX(80px);
}
.hinge {
  transform-origin: left center;
  transform: rotate(15deg);
}
```

#### Для закрепления

- [Чем transform: translate отличается от изменения margin или позиции?](/questions/css-transform-flow-geometry)

#### Источник

[MDN: transform](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform).
