**`:hover` относится к наведению, `:active` - к периоду активации, `:focus` - к фокусу элемента, `:focus-within` - к фокусу внутри его поддерева.** Они могут действовать одновременно.

<!-- wishu:answer-block -->

#### Механизм и границы

- Активированная кнопка не обязательно остаётся `:active` после завершения нажатия. Для выбранного пункта нужен отдельный источник состояния, например aria-current или атрибут приложения.
- `:focus-within` удобно подсвечивает группу поля вместе с вложенной кнопкой. Но это не делает сам контейнер фокусируемым.
- Hover недоступен как устойчивый способ взаимодействия на части сенсорных устройств. Не прячьте единственное действие до наведения без клавиатурного и сенсорного пути.

#### Пример

```css
.field:focus-within {
  outline: 2px solid #2563eb;
}
button:active {
  transform: translateY(1px);
}
@media (hover: hover) {
  button:hover {
    text-decoration: underline;
  }
}
```

#### Для закрепления

- [Как оформить focus-visible и не потерять клавиатурную доступность?](/questions/css-focus-indicator)

#### Источник

[MDN: :focus-within](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-within).
