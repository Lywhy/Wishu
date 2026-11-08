**Теги описывают зависимости кеша: общий тег списка и тег конкретного ID позволяют выбрать область инвалидирования.**

<!-- wishu:answer-block -->

### Механизм и границы

- Изменение записи может затрагивать и её карточку, и агрегированный список.

- Тег не является ключом query и не объединяет сущности между endpoint. Слишком общий invalidatesTags вызывает лишние refetch, слишком узкий оставляет устаревшие данные.

### Пример

```jsx
const configuration = {
  providesTags: (result) =>
    result
      ? [...result.map((item) => ({ type: "Post", id: item.id })), { type: "Post", id: "LIST" }]
      : [{ type: "Post", id: "LIST" }],
}
```

### Типичная ошибка

Инвалидировать только ID после создания записи, хотя новый элемент отсутствует в кеше списка.

### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

- [Чем RTK Query отличается от запроса внутри createAsyncThunk?](/questions/redux-query-cache)

### Источник

[Redux: automated-refetching](https://redux.js.org/toolkit/rtk-query/usage/automated-refetching)
