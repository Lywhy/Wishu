**Reducer вычисляет переход состояния, а Context доставляет state и dispatch нужным потомкам.** Два отдельных контекста позволяют не подписывать компонент, которому нужен только dispatch, на значение state.

<!-- wishu:answer-block -->

### Как это работает

- Храните reducer и `useReducer` у осмысленного владельца, а не создавайте новый reducer в каждом потребителе.

- dispatch имеет стабильную идентичность. Разделение контекстов уменьшает изменения значения для dispatch-потребителей, но не отменяет их возможные рендеры от родителя.

- Не превращайте reducer в место сетевых запросов и DOM-операций. Такой шаблон не добавляет автоматически кеш запросов, селекторы и инструменты внешнего store.

### Пример

```jsx
const StateContext = createContext(null)
const DispatchContext = createContext(null)
function TasksProvider({ children }) {
  const [state, dispatch] = useReducer(tasksReducer, [])
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  )
}
// tasksReducer - чистая функция перехода состояния.
```

### Типичная ошибка

Создать value={{state, dispatch}} в одном Context и ожидать выборочной подписки на одно поле.

### Источники

- [React: learn / scaling-up-with-reducer-and-context](https://react.dev/learn/scaling-up-with-reducer-and-context)
