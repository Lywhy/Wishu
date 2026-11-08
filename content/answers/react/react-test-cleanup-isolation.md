**Размонтирование завершает жизнь дерева и даёт эффектам освободить созданные ресурсы.**

<!-- wishu:answer-block -->

### Механизм и границы

- Testing Library может подключать автоматический cleanup в поддерживаемой конфигурации; проверьте настройку runner.

- Очистка DOM не сбрасывает сама глобальные stores, mocks и fake timers. Эти ресурсы изолируют отдельно.

### Пример

```jsx
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})
```

### Типичная ошибка

Считать новый render гарантией пустого общего store или отсутствия старой подписки.

### Для закрепления

- [Что стоит проверять в тесте React-компонента?](/questions/react-test-behavior)

### Источник

[Testing Library: api](https://testing-library.com/docs/react-testing-library/api/#cleanup)
