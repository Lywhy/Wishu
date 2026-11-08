**InjectEndpoints добавляет определения к существующему API, позволяя разделить код без создания независимого кеша на каждый файл.**

<!-- wishu:answer-block -->

### Механизм и границы

- Сохраняются общий reducerPath и middleware исходного API.

- Имена endpoint не должны случайно конфликтовать; overrideExisting задаёт явный контракт замены. Для TypeScript используйте возвращённый расширенный API там, где нужны новые типы.

- Инъекция кода не загружает данные заранее и не решает авторизацию endpoint.

### Пример

```jsx
export const postsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({ getPost: build.query({ query: (id) => "posts/" + id }) }),
})
```

### Типичная ошибка

Создавать новый createApi для каждой feature только ради разбиения исходников.

### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

- [Чем RTK Query отличается от запроса внутри createAsyncThunk?](/questions/redux-query-cache)

### Источник

[Redux: code-splitting](https://redux.js.org/toolkit/rtk-query/usage/code-splitting)
