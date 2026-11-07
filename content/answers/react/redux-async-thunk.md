**`createAsyncThunk` генерирует thunk с `pending`/`fulfilled`/`rejected` действиями.** Он не создаёт автоматически `reducer` данных, а возвращаемый `dispatch`-промис обычно завершается объектом итогового action.

<!-- wishu:answer-block -->

#### Механизм и границы

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

#### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

#### Источник

[Redux: createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk).
