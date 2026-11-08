**Без middleware dispatch обычного action возвращает action; middleware может задать другой результат, как thunk возвращает результат своей функции.**

<!-- wishu:answer-block -->

### Механизм и границы

- Поэтому dispatch не является универсальным Promise.

- CreateAsyncThunk возвращает специальный Promise результата dispatch с отдельным unwrap-контрактом. Не путайте вызов creator, dispatch и ожидание бизнес-результата.

### Пример

```jsx
const result = store.dispatch({ type: "counter/increment" })
// result - action при обычном базовом dispatch.
const user = await dispatch(loadUser(id)).unwrap()
```

### Типичная ошибка

Использовать один await dispatch(...) одинаково для любой архитектуры middleware.

### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

### Источник

[Redux: store](https://redux.js.org/api/store#dispatchaction)
