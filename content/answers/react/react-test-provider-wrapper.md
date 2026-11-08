**Тестируйте потребителя с настоящим минимальным провайдером и управляемыми начальными данными вместо глобального мока `useContext`.**

<!-- wishu:answer-block -->

### Механизм и границы

- Так проверяется реальный контракт подписки и границы дерева.

- Wrapper должен создаваться с изолированным состоянием для теста; общие singleton-stores могут переносить изменения между сценариями. Не включайте весь production App без необходимости.

### Пример

```jsx
render(<Profile />, {
  wrapper: ({ children }) => <User.Provider value={testUser}>{children}</User.Provider>,
})
```

### Типичная ошибка

Замокировать все вызовы `useContext` одной заглушкой и случайно изменить несвязанные контексты.

### Для закрепления

- [Что стоит проверять в тесте React-компонента?](/questions/react-test-behavior)

### Источник

[Testing Library: api](https://testing-library.com/docs/react-testing-library/api/#wrapper)
