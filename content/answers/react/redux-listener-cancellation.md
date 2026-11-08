**ListenerMiddleware может отменять предыдущие экземпляры своего эффекта и строить debounce/takeLatest-подобные процессы.**

<!-- wishu:answer-block -->

### Механизм и границы

- CancelActiveListeners затрагивает другие активные экземпляры соответствующего listener, а поддерживающие ожидания используют отменяемый API.

- Не любой произвольный Promise автоматически прекращает работу. Сеть должна учитывать signal, а серверная операция - собственный контракт актуальности.

- Listener работает вне reducer и не должен превращать цепочку событий в неуправляемый цикл dispatch.

### Пример

```jsx
const configuration = {
  effect: async (action, api) => {
    api.cancelActiveListeners()
    await api.delay(300)
    await saveDraft(action.payload, { signal: api.signal })
  },
}
```

### Типичная ошибка

Рассчитывать, что отмена listener автоматически откатила прежний запрос на сервере.

### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

- [Для чего middleware и listenerMiddleware нужны вне reducer?](/questions/redux-middleware-effects)

### Источник

[Redux: createListenerMiddleware](https://redux.js.org/toolkit/api/createListenerMiddleware)
