**Async-действие Zustand - обычная функция, которая обновляет store через `set`.** Библиотека не добавляет автоматически кеш, отмену и политику гонок.

<!-- wishu:answer-block -->

#### Механизм и границы

- Согласуйте loading/error/data и обрабатывайте неуспешный HTTP-ответ. Promise-завершение не доказывает успешный HTTP-статус.
- После await прежние считанные данные могли устареть. Get читает актуальный store, но для ответа всё равно нужна проверка идентификатора запроса или отмена.
- В примере результат применяется, только если `requestId` всё ещё актуален. Обработка ошибок должна использовать ту же проверку, иначе старая ошибка затрёт новый результат.
- Для полноценного server state можно выбрать специализированный query-кеш, оставив Zustand для клиентского состояния.

#### Пример

```typescript
const id = get().requestId + 1
set({ requestId: id, loading: true })
const result = await loadProfile()
if (get().requestId === id) {
  set({ profile: result, loading: false })
}
// Фрагмент успешной ветки; ошибки обрабатываются с той же проверкой.
```

#### Для закрепления

- [Что делает createAsyncThunk и зачем нужен unwrap?](/questions/redux-async-thunk)
- [Как выбрать между props, Context и внешним store?](/questions/react-state-location)

#### Источник

[Zustand: zustand](https://github.com/pmndrs/zustand#async-actions).
