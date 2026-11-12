**Ключ в reducer-map `configureStore` задаёт соответствующее поле root state, а не имя переменной slice.**

<!-- wishu:answer-block -->

#### Как это работает

Name slice влияет на префикс генерируемых action types; это другой контракт. Selector должен читать реальную конфигурацию root state. Переименование ключа требует согласования selectors и сохранённых данных.

#### Пример

```jsx
configureStore({ reducer: { account: userSlice.reducer } })
const selectUser = (state) => state.account.user
```

#### Разбор примера

Имя account в объекте reducer определяет путь state.account. Имя самого slice используется прежде всего как префикс автоматически созданных action types и не переименовывает этот ключ. Поэтому selector должен соответствовать конфигурации root reducer. Если перенести slice под другой ключ, старый selector может читать undefined даже при полностью исправном reducer.

#### Типичная ошибка

Читать state.user только потому, что slice называется user.

#### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

#### Источники

[Redux: configureStore](https://redux.js.org/toolkit/api/configureStore)
