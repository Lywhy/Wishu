**Обычная локальная переменная создаётся при вызове компонента заново и не сообщает React о необходимости обновить UI.**

<!-- wishu:answer-block -->

### Механизм и границы

- Замыкание обработчика может изменить свою переменную, но это не запрашивает новый render.

- Для отображаемых данных нужен state. Для служебного значения, переживающего render без обновления UI, подходит ref.

### Пример

```jsx
function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount((n) => n + 1)}>{count}</button>
}
```

### Типичная ошибка

Увеличивать let count внутри onClick и ждать обновления числа на странице.

### Для закрепления

- [Что такое JSX и чем он отличается от HTML?](/questions/react-jsx)

### Источник

[React: state-a-components-memory](https://react.dev/learn/state-a-components-memory)
