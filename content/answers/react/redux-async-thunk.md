**`createAsyncThunk` генерирует thunk с `pending`/`fulfilled`/`rejected` действиями.** Он не создаёт автоматически `reducer` данных, а возвращаемый `dispatch`-промис обычно завершается объектом итогового action.

<!-- wishu:answer-block -->

#### Как это работает

- Для переходов состояния используют `extraReducers`. Payload запроса и результат должны иметь понятный контракт.
- `unwrap` возвращает `payload` успешного action либо выбрасывает ошибку/значение `rejectWithValue`. Один try/catch вокруг await `dispatch` без `unwrap` не эквивалентен ожиданию обычного rejecting promise.
- Отмена требует передачи `signal` в поддерживающую операцию; создание `rejected` action само по себе не гарантирует прекращения серверной работы.
- Для гонок можно проверять `requestId` и актуальность аргументов. Для стандартного server-state кеша рассмотрите RTK Query вместо собственного кеширования каждым thunk.

#### Пример

```typescript
try {
  const user = await dispatch(fetchUser(userId)).unwrap()
  showUser(user)
} catch (error) {
  showError(error)
}
```

#### Разбор примера

dispatch такого thunk возвращает promise с итоговым lifecycle-action. Само его ожидание не превращает rejected action в исключение, поэтому для привычного try/catch используется unwrap: он возвращает успешный payload либо выбрасывает причину отказа. Обновление loading, data и error обычно описывают в extraReducers. Thunk организует операцию, но не предоставляет автоматически query-кеш с дедупликацией.

#### Типичная ошибка

> Ожидать, что rejected thunk автоматически попадёт в catch без unwrap.

#### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

#### Источники

[Redux: createAsyncThunk](https://redux.js.org/toolkit/api/createAsyncThunk)
