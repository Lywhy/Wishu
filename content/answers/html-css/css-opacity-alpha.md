**`opacity` применяется к результату отрисовки элемента вместе с потомками.** Альфа-канал фонового цвета делает прозрачным только соответствующий слой фона.

<!-- wishu:answer-block -->

#### Механизм и границы

- Потомок с `opacity`: 1 не отменит полупрозрачность группы родителя. Если нужен прозрачный фон и непрозрачный текст, меняют альфу `background-color`.
- Opacity меньше 1 создаёт stacking context. Это может изменить сравнение `z-index` относительно соседних групп.
- `opacity`: 0 не отключает фокус и события. Для скрытия или недоступности действия нужен иной контракт.

#### Пример

```css
.panel {
  background-color: rgb(20 30 50 / 0.2);
}
/* Текст panel остаётся непрозрачным. */
.faded-group {
  opacity: 0.2;
}
/* Полупрозрачен весь результат вместе с текстом. */
```

#### Для закрепления

- [Чем различаются display: none, visibility, opacity, aria-hidden и inert?](/questions/html-hiding-contract)
- [Почему большой z-index не поднимает элемент над соседним блоком?](/questions/css-position-stacking)

#### Источник

[MDN: opacity](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/opacity).
