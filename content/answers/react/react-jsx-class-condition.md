**`className` должен получить готовую строку; условные части удобно явно собирать из нужных имён классов.**

<!-- wishu:answer-block -->

### Механизм и границы

- Логическое выражение внутри шаблонной строки может превратить false в текст.

- Для простого случая подходит тернарный оператор; для нескольких классов - принятая в проекте функция объединения. Это не меняет существование DOM-элемента.

### Пример

```jsx
const className = ["card", selected ? "selected" : null].filter(Boolean).join(" ")
return <div className={className} />
```

### Типичная ошибка

Написать строковую интерполяцию логического && и получить ненужный класс false.

### Для закрепления

- [Что такое JSX и чем он отличается от HTML?](/questions/react-jsx)

### Источник

[React: javascript-in-jsx-with-curly-braces](https://react.dev/learn/javascript-in-jsx-with-curly-braces)
