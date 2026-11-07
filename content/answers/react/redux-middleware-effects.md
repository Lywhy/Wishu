**Middleware расширяет обработку `dispatch` вокруг `reducer`.** Listener `middleware` позволяет реагировать на действия или условия и выполнять эффекты, оставляя `reducer` чистым.

<!-- wishu:answer-block -->

#### Механизм и границы

- Thunk подходит для явной асинхронной команды. Listener удобен для реакции вроде «после события сохранить настройку» или отменяемой последовательности.
- В `middleware` важно передать управление дальше через next, если действие должно дойти до `reducer`. Новое `dispatch` внутри каждого перехвата может создать цикл.
- ConfigureStore даёт стандартный набор `middleware`. При добавлении своих не теряйте его случайной полной заменой.
- Отмена задач listener не является автоматической отменой любой внешней операции: операция должна поддерживать соответствующий сигнал/контракт.

#### Пример

```typescript
listener.startListening({
  actionCreator: settingsChanged,
  effect: async (action, api) => {
    await saveSettings(action.payload)
  },
})
```

#### Для закрепления

- [Что делает createAsyncThunk и зачем нужен unwrap?](/questions/redux-async-thunk)

#### Источник

[Redux: createListenerMiddleware](https://redux-toolkit.js.org/api/createListenerMiddleware).
