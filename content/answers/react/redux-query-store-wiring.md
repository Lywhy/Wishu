**Reducer хранит query-state, а middleware обслуживает жизненный цикл подписок, запросов и кеша; API требует обоих подключений.**

<!-- wishu:answer-block -->

### Механизм и границы

- Используйте api.reducerPath как ключ и добавьте api.middleware к стандартным middleware, не заменяя их случайно.

- Несколько созданных createApi имеют отдельные области кеша и собственные накладные расходы; разделение файлов не обязано означать новый API.

### Пример

```jsx
configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefault) => getDefault().concat(api.middleware),
})
```

### Типичная ошибка

Подключить только reducer и считать generated hooks полноценной настроенной интеграцией.

### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

- [Чем RTK Query отличается от запроса внутри createAsyncThunk?](/questions/redux-query-cache)

### Источник

[Redux: overview](https://redux.js.org/toolkit/rtk-query/overview)
