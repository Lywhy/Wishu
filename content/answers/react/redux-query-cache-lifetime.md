**KeepUnusedDataFor задаёт срок сохранения query-записи после ухода последнего подписчика, а не обязательную свежесть ответа.**

<!-- wishu:answer-block -->

### Механизм и границы

- Пока есть подписчики, запись имеет другой жизненный цикл.

- Срок кеша, refetchOnMountOrArgChange и tag invalidation решают разные задачи. Уменьшение `keepUnusedDataFor` не превращает активную запись в периодический polling.

### Пример

```jsx
const configuration = {
  getPost: build.query({
    query: (id) => "posts/" + id,
    keepUnusedDataFor: 30,
  }),
}
```

### Типичная ошибка

Считать число 30 гарантией обновления сервера каждые 30 секунд.

### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

- [Чем RTK Query отличается от запроса внутри createAsyncThunk?](/questions/redux-query-cache)

### Источник

[Redux: cache-behavior](https://redux.js.org/toolkit/rtk-query/usage/cache-behavior)
