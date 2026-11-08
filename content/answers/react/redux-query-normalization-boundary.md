**RTK Query хранит результаты query по endpoint и аргументам, а не единственную глобальную копию каждой сущности во всех ответах.**

<!-- wishu:answer-block -->

### Механизм и границы

- Один Post может присутствовать в detail и нескольких списках. Tags помогают обновить связанные результаты, но не делают общий entity graph.

- Можно нормализовать отдельный ответ через entity adapter, однако это не объединит другие записи кеша автоматически.

- При ручных обновлениях перечислите затронутые ключи либо используйте invalidation; учитывайте сортировки, пагинацию и агрегаты.

### Пример

```jsx
// getPost(7), getPosts({ page: 1 }) и getPosts({ favorite: true })
// являются разными cache entries даже при наличии записи id=7.
```

### Типичная ошибка

Изменить detail через updateQueryData и ожидать автоматического изменения всех списков.

### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

- [Чем RTK Query отличается от запроса внутри createAsyncThunk?](/questions/redux-query-cache)

### Источник

[Redux: cache-behavior](https://redux.js.org/toolkit/rtk-query/usage/cache-behavior)
