**Loader Data Router связан с маршрутом и его навигацией, а `useEffect` запускается после commit компонента и требует собственной модели загрузки.**

<!-- wishu:answer-block -->

### Механизм и границы

- Loader позволяет router управлять данными, отменой и состоянием перехода до показа страницы.

- Data API требует Data/Framework mode: декларативный BrowserRouter с Routes сам его не включает. Вне router эффект остаётся допустимым инструментом внешней синхронизации.

### Пример

```jsx
const router = createBrowserRouter([{ path: "/users/:id", loader: loadUser, Component: UserPage }])
```

### Типичная ошибка

Добавить loader к несоответствующей декларативной конфигурации и ждать автоматической загрузки.

### Для закрепления

- [Какие состояния интерфейса стоит хранить в URL и как избежать второго источника истины?](/questions/react-url-state)

- [Что делает BrowserRouter и чем клиентский переход отличается от полной загрузки документа?](/questions/react-router-browser-history)

### Источник

[React Router: data-loading](https://reactrouter.com/7.18.5/start/data/data-loading)
