**Для примитивного state обновление задаёт новое примитивное значение; методы actions тогда обычно хранят вне самого числа.**

<!-- wishu:answer-block -->

### Механизм и границы

- Полная замена особенно важна, когда форма state не является объектом с полями.

- Типизируйте публичный setter и не ожидайте merge полей числа. При необходимости данных вместе с actions удобнее объектный state.

### Пример

```jsx
const scoreStore = createStore(() => 0)
scoreStore.setState((value) => value + 1, true)
```

### Типичная ошибка

Обращаться к count-полю у store, который по контракту хранит само число.

### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

### Источник

[Zustand: create-store](https://zustand.docs.pmnd.rs/reference/apis/create-store)
