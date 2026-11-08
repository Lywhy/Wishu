**Для изоляции тестов полезно создавать store фабрикой на каждый сценарий либо явно восстанавливать полный исходный снимок.**

<!-- wishu:answer-block -->

### Механизм и границы

- React-подписки должны увидеть reset в корректной act-границе.

- Persist может снова восстановить старые данные из тестового storage после сброса памяти, поэтому изолируйте и хранилище, и незавершённую гидратацию. Подписки и таймеры также очищаются отдельно.

- Изолированный тест проверяет поведение через публичные actions/selectors, а не приватное устройство библиотеки.

### Пример

```jsx
const store = makeStore(testInitialState)
render(
  <StoreProvider store={store}>
    <Editor />
  </StoreProvider>,
)
// Следующий тест получает новый store и свой storage.
```

### Типичная ошибка

Очистить только DOM, оставив singleton-store и localStorage от предыдущего теста.

### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

- [Как сбросить Zustand-state и почему logout требует большего, чем clearStorage?](/questions/zustand-reset-lifetime)

### Источник

[Zustand: testing](https://zustand.docs.pmnd.rs/learn/guides/testing)
