**Skip/skipToken условно не запускает автоматическую query-подписку, а lazy query позволяет запускать чтение командой.**

<!-- wishu:answer-block -->

### Механизм и границы

- SkipToken полезен в TypeScript, когда обязательный аргумент пока отсутствует.

- Не вызывайте сам React-хук условно. Выбор lazy не отменяет кеш и не делает query мутацией; политику использования кеша нужно читать в API trigger.

### Пример

```jsx
const result = useGetUserQuery(userId ?? skipToken)
const [loadUser] = useLazyGetUserQuery()
```

### Типичная ошибка

Ставить if перед вызовом generated hook вместо управления его аргументом.

### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

- [Чем RTK Query отличается от запроса внутри createAsyncThunk?](/questions/redux-query-cache)

### Источник

[Redux: conditional-fetching](https://redux.js.org/toolkit/rtk-query/usage/conditional-fetching)
