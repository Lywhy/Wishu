**PreloadedState задаёт исходные данные store, например полученный серверный снимок или сохранённые настройки.**

<!-- wishu:answer-block -->

#### Как это работает

Он должен соответствовать форме reducers и доверенной схеме данных. При SSR пользовательский store создают отдельно для запроса. Передача preloadedState в общий singleton не изолирует пользователей и не отменяет необходимость согласовать HTML гидратации.

#### Пример

```jsx
const store = configureStore({
  reducer: rootReducer,
  preloadedState: validatedInitialData,
})
```

#### Разбор примера

preloadedState задаёт стартовые данные при создании экземпляра store. Он должен соответствовать форме root reducer и проходить проверку, если получен извне. При SSR экземпляр с пользовательскими данными создают отдельно для запроса, а клиент начинает с согласованного снимка. Последующее изменение внешней переменной `initialData` не обновляет уже созданный store автоматически.

#### Типичная ошибка

Загрузить непроверенный `localStorage` как доверенное состояние сессии.

#### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

#### Источники

[Redux: configureStore](https://redux.js.org/toolkit/api/configureStore)
