**SelectFromResult позволяет компоненту получать только нужную часть query-результата; стабильные ссылки результата важны для пропуска обновлений.**

<!-- wishu:answer-block -->

### Механизм и границы

- Не создавайте новый пустой массив на каждом вызове, если его стабильность важна.

- Это выборка из существующей query-подписки, а не новый серверный endpoint. Убедитесь, что обработаны отсутствие данных и смена аргумента.

### Пример

```jsx
const empty = []
const { items } = useGetPostsQuery(topic, {
  selectFromResult: (result) => ({ items: result.data ?? empty }),
})
```

### Типичная ошибка

Возвращать заново отфильтрованный массив для каждого вызова без оценки стабильности.

### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

- [Чем RTK Query отличается от запроса внутри createAsyncThunk?](/questions/redux-query-cache)

### Источник

[Redux: queries](https://redux.js.org/toolkit/rtk-query/usage/queries)
