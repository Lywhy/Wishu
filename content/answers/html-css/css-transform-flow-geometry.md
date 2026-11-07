**Transform меняет отображение коробки, но обычно не перестраивает нормальный поток соседей.** Сдвиг `margin` участвует в размещении, а relative-offset оставляет исходное место, но использует другую модель позиционирования.

<!-- wishu:answer-block -->

#### Механизм и границы

- Перемещённый `translate` блок может перекрыть соседний: его прежнее место в layout остаётся. Видимая геометрия `getBoundingClientRect` учитывает преобразование.
- Проценты `translate` обычно считаются от собственной reference box элемента, а не как left: 50% от содержащего блока.
- Transform может создать stacking context и содержащий блок для позиционированных потомков. Это существенный побочный эффект, даже если сдвиг визуально нулевой.
- Преобразование не гарантирует отдельный compositor layer или бесплатную анимацию; стоимость оценивают по реальному сценарию.

#### Пример

```css
.badge {
  transform: translateX(50%);
}
/* Обычно сдвиг на половину ширины reference box самой badge. */
```

#### Для закрепления

- [Относительно чего позиционируются absolute и fixed?](/questions/css-containing-block)
- [Как различаются getBoundingClientRect, clientHeight, offsetHeight и scrollHeight?](/questions/js-dom-geometry)

#### Источник

[MDN: transform](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform).
