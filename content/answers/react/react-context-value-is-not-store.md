**Context доставляет значение и подписывает на его изменение, но не создаёт state, setter или журнал действий автоматически.**

<!-- wishu:answer-block -->

### Механизм и границы

- Значение может приходить из `useState`, `useReducer` или внешнего store.

- Объект с методами в value - контракт приложения. Передача одного объекта не добавляет выборочную подписку на его поля.

### Пример

```jsx
const [theme, setTheme] = useState("light")
return <Theme.Provider value={{ theme, setTheme }}>{children}</Theme.Provider>
```

### Типичная ошибка

Ожидать возможности изменить createContext напрямую без владельца состояния.

### Для закрепления

- [Как Context передаёт данные и откуда берётся значение по умолчанию?](/questions/react-context)

### Источник

[React: passing-data-deeply-with-context](https://react.dev/learn/passing-data-deeply-with-context)
