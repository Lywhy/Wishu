**Несколько reducers могут независимо обработать одно событие; action не адресуется единственному slice.**

<!-- wishu:answer-block -->

### Механизм и границы

- Например, logout может очистить сессию, приватный кеш и локальный выбор.

- Это не разрешает одному reducer напрямую менять state другого. Каждая часть вычисляет свой результат из своего входа.

### Пример

```jsx
builder.addCase(loggedOut, () => initialState)
// Другой slice также может обработать loggedOut.
```

### Типичная ошибка

Связать очистку нескольких slices цепочкой несогласованных действий без единого события намерения.

### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

### Источник

[Redux: createSlice](https://redux.js.org/toolkit/api/createSlice)
