**OnCacheEntryAdded позволяет связать потоковую подписку с жизнью конкретной кеш-записи, а не каждого отдельного компонента.**

<!-- wishu:answer-block -->

### Механизм и границы

- Дождитесь начальных данных, применяйте сообщения через updateCachedData и освободите соединение после cacheEntryRemoved.

- Запись может жить после ухода UI в течение срока кеша. Ошибка первоначальной загрузки также требует cleanup через finally.

- Валидируйте сообщения и порядок версий: WebSocket не превращает разные query-записи в одну нормализованную сущность.

### Пример

```jsx
const configuration = {
  async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved }) {
    const socket = openSocket(arg)
    try {
      await cacheDataLoaded
      await cacheEntryRemoved
    } finally {
      socket.close()
    }
  },
  // Обработка сообщений и updateCachedData определяются отдельно.
}
```

### Типичная ошибка

Закрывать сокет только при успешной загрузке и оставлять ресурс после отказа начального запроса.

### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

- [Чем RTK Query отличается от запроса внутри createAsyncThunk?](/questions/redux-query-cache)

### Источник

[Redux: streaming-updates](https://redux.js.org/toolkit/rtk-query/usage/streaming-updates)
