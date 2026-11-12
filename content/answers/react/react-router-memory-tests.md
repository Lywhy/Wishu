**MemoryRouter хранит тестовую историю в памяти и позволяет воспроизвести исходный путь без настоящей навигации документа.**

<!-- wishu:answer-block -->

#### Как это работает

InitialEntries задаёт стартовый URL. Проверяйте отображённый маршрут и результат перехода, а не приватные детали history. Для loader/action нужен соответствующий memory Data Router, а не ожидание Data API от обычного MemoryRouter.

#### Пример

```jsx
render(
  <MemoryRouter initialEntries={["/users/7"]}>
    <AppRoutes />
  </MemoryRouter>,
)
expect(screen.getByRole("heading", { name: "Пользователь 7" })).toBeVisible()
```

#### Разбор примера

InitialEntries задаёт реальный вход /users/7, поэтому проверяется не только компонент, но и связь params с экраном. Заголовок является наблюдаемым результатом. Для маршрутов с loader нужно выбрать memory-вариант Data Router, сохранив тот же режим интеграции.

#### Типичная ошибка

Тестировать только компонент страницы без route params и считать проверенной интеграцию маршрута.

#### Для закрепления

- [Какие состояния интерфейса стоит хранить в URL и как избежать второго источника истины?](/questions/react-url-state)

- [Что делает BrowserRouter и чем клиентский переход отличается от полной загрузки документа?](/questions/react-router-browser-history)

#### Источники

[React Router: MemoryRouter](https://reactrouter.com/7.18.5/api/declarative-routers/MemoryRouter)
