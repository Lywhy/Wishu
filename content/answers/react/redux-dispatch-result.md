**Без middleware dispatch обычного action возвращает action; middleware может задать другой результат, как thunk возвращает результат своей функции.**

<!-- wishu:answer-block -->

#### Как это работает

Поэтому dispatch не является универсальным Promise. `createAsyncThunk` возвращает специальный Promise результата dispatch с отдельным unwrap-контрактом. Не путайте вызов creator, dispatch и ожидание бизнес-результата.

#### Пример

```jsx
const result = store.dispatch({ type: "counter/increment" })
// result - action при обычном базовом dispatch.
const user = await dispatch(loadUser(id)).unwrap()
```

#### Разбор примера

У обычного action результат dispatch обычно совпадает с переданным объектом. Middleware могут изменить этот контракт: thunk возвращает результат выполняемой функции, а `createAsyncThunk` предоставляет promise с дополнительными методами. Поэтому нельзя считать каждый dispatch одинаковым Promise или всегда вызывать unwrap. Тип AppDispatch помогает отличать эти случаи при использовании TypeScript.

#### Типичная ошибка

Использовать один await dispatch(...) одинаково для любой архитектуры middleware.

#### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

#### Источники

[Redux: store](https://redux.js.org/api/store#dispatchaction)
