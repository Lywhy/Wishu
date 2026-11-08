**Ключ в reducer-map `configureStore` задаёт соответствующее поле root state, а не имя переменной slice.**

<!-- wishu:answer-block -->

### Механизм и границы

- Name slice влияет на префикс генерируемых action types; это другой контракт.

- Selector должен читать реальную конфигурацию root state. Переименование ключа требует согласования selectors и сохранённых данных.

### Пример

```jsx
configureStore({ reducer: { account: userSlice.reducer } })
const selectUser = (state) => state.account.user
```

### Типичная ошибка

Читать state.user только потому, что slice называется user.

### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

### Источник

[Redux: configureStore](https://redux.js.org/toolkit/api/configureStore)
