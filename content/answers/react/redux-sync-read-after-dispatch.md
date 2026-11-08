**Обычный синхронный action вычисляется reducers до возврата базового dispatch, поэтому `getState` после него видит новый снимок.**

<!-- wishu:answer-block -->

### Механизм и границы

- Асинхронный thunk может начать работу, которая ещё не закончилась.

- React-компонент при этом не обязан немедленно выполнить новый render: синхронность store и расписание React - разные уровни.

### Пример

```jsx
store.dispatch(counterSlice.actions.incremented())
console.log(store.getState().counter.value)
```

### Типичная ошибка

Путать готовность store с обновлением переменной `useSelector` в уже работающем обработчике.

### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

### Источник

[Redux: store](https://redux.js.org/api/store)
