**Reducers определяет собственные case и генерирует action creators, а `extraReducers` реагирует на действия, определённые снаружи.**

<!-- wishu:answer-block -->

#### Как это работает

Builder.addCase связывает обработчик с типизированным action creator, включая lifecycle thunk. `extraReducers` не создаёт новый creator для чужого события. Такой обработчик всё равно должен оставаться чистым reducer, а не подпиской на внешнюю систему.

#### Пример

```jsx
const configuration = {
  extraReducers: (builder) => {
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.user = action.payload
    })
  },
}
```

#### Разбор примера

addCase подписывает slice на уже существующий action, например успешное завершение thunk. В отличие от поля reducers, `extraReducers` не создаёт новый action creator. Обработчик всё равно остаётся синхронным reducer и изменяет только свой draft. Сетевой запрос запускается снаружи; сюда приходит результат, на основании которого вычисляется новое состояние.

#### Типичная ошибка

Отправлять запрос из `extraReducers` только потому, что он реагирует на асинхронное событие.

#### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

- [Что создаёт createSlice и почему в его reducer разрешена запись state.value++?](/questions/redux-slice-immer)

#### Источники

[Redux: createSlice](https://redux.js.org/toolkit/api/createSlice)
