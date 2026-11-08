**Reducers определяет собственные case и генерирует action creators, а extraReducers реагирует на действия, определённые снаружи.**

<!-- wishu:answer-block -->

### Механизм и границы

- Builder.addCase связывает обработчик с типизированным action creator, включая lifecycle thunk.

- ExtraReducers не создаёт новый creator для чужого события. Такой обработчик всё равно должен оставаться чистым reducer, а не подпиской на внешнюю систему.

### Пример

```jsx
const configuration = {
  extraReducers: (builder) => {
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.user = action.payload
    })
  },
}
```

### Типичная ошибка

Отправлять запрос из extraReducers только потому, что он реагирует на асинхронное событие.

### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

- [Что создаёт createSlice и почему в его reducer разрешена запись state.value++?](/questions/redux-slice-immer)

### Источник

[Redux: createSlice](https://redux.js.org/toolkit/api/createSlice)
