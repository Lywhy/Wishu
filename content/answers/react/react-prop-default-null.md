**Значение по умолчанию при деструктуризации применяется к undefined, но не к явно переданному null.**

<!-- wishu:answer-block -->

### Механизм и границы

- Отсутствующий prop также даёт undefined. Если null должен означать отсутствие значения, отдельно определите такой контракт.

- Оператор ?? обрабатывает и null, и undefined, сохраняя 0 и пустую строку; || дополнительно заменит все falsy-значения.

### Пример

```jsx
function Badge({ count = 1 }) {
  return <span>{String(count)}</span>
}
// <Badge /> -> 1; <Badge count={null} /> -> null.
```

### Типичная ошибка

Считать деструктуризацию универсальной нормализацией всех пустых значений.

### Для закрепления

- [Что такое JSX и чем он отличается от HTML?](/questions/react-jsx)

- [Как работают props и children?](/questions/react-props-children)

### Источник

[React: learn / passing-props-to-a-component](https://react.dev/learn/passing-props-to-a-component)
