**PreloadedState задаёт исходные данные store, например полученный серверный снимок или сохранённые настройки.**

<!-- wishu:answer-block -->

### Механизм и границы

- Он должен соответствовать форме reducers и доверенной схеме данных.

- При SSR пользовательский store создают отдельно для запроса. Передача preloadedState в общий singleton не изолирует пользователей и не отменяет необходимость согласовать HTML гидратации.

### Пример

```jsx
const store = configureStore({
  reducer: rootReducer,
  preloadedState: validatedInitialData,
})
```

### Типичная ошибка

Загрузить непроверенный localStorage как доверенное состояние сессии.

### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

### Источник

[Redux: configureStore](https://redux.js.org/toolkit/api/configureStore)
