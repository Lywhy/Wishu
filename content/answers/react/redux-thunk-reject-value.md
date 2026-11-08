**RejectWithValue задаёт ожидаемый типизированный payload ошибки, а throw обычно попадает в сериализованное поле error lifecycle-action.**

<!-- wishu:answer-block -->

### Механизм и границы

- Используйте прикладной payload для ошибок валидации, не бросая наружу сырой ответ с секретами.

- При unwrap отказ также становится выброшенным результатом для вызывающего кода. Тип payload сам не проверяет внешний JSON; сначала нормализуйте ответ.

### Пример

```jsx
if (!response.ok) {
  return rejectWithValue({ message: "Проверьте данные формы" })
}
return response.json()
```

### Типичная ошибка

Ожидать, что rejected action всегда имеет одинаковый payload независимо от способа отказа.

### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

### Источник

[Redux: createAsyncThunk](https://redux.js.org/toolkit/api/createAsyncThunk)
