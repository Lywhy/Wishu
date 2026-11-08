**Чтобы обнаружить уход фокуса из всей группы, сравните `relatedTarget` с границами `currentTarget` через contains.**

<!-- wishu:answer-block -->

### Механизм и границы

- React onBlur обрабатывает и переходы от потомков, поэтому сам факт blur не означает уход из составного поля.

- RelatedTarget может быть null: например, при уходе фокуса за пределы доступного документа. Такой случай тоже обработайте.

### Пример

```jsx
function handleBlur(event) {
  if (!event.currentTarget.contains(event.relatedTarget)) {
    setEditing(false)
  }
}
// onBlur размещается на контейнере поля и его кнопок.
```

### Типичная ошибка

Завершать редактирование при переходе из input к кнопке очистки того же поля.

### Для закрепления

- [Что такое JSX и чем он отличается от HTML?](/questions/react-jsx)

- [Как распространение React-событий связано с DOM и обработчиками capture?](/questions/react-event-boundaries)

### Источник

[React: components / common](https://react.dev/reference/react-dom/components/common)
