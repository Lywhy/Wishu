**Trigger mutation возвращает результат операции, unwrap позволяет обрабатывать успех/ошибку привычным async-потоком, а reset очищает локальное состояние результата хука.**

<!-- wishu:answer-block -->

### Механизм и границы

- Reset не откатывает выполненную сервером мутацию.

- Mutation-состояния разных экземпляров хука не следует автоматически считать общими; общий fixedCacheKey имеет отдельный контракт. После успеха согласуйте кеш через tags или целевое обновление.

### Пример

```jsx
const [save, { reset }] = useUpdatePostMutation()
try {
  await save({ id, title }).unwrap()
} catch (error) {
  showSaveError(error)
}
// reset() убирает результат этого mutation-состояния.
```

### Типичная ошибка

Назвать reset кнопкой отмены уже сохранённой записи.

### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

- [Чем RTK Query отличается от запроса внутри createAsyncThunk?](/questions/redux-query-cache)

### Источник

[Redux: mutations](https://redux.js.org/toolkit/rtk-query/usage/mutations)
