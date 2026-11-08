**Outlet обозначает место дочернего совпавшего маршрута внутри layout.**

<!-- wishu:answer-block -->

### Механизм и границы

- Родитель может показывать общую навигацию, а дочерний маршрут - содержимое этой области.

- Наличие вложенного Route без Outlet не заставляет React автоматически вставить его рядом с JSX родителя.

### Пример

```jsx
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
;<Route element={<Layout />}>
  <Route path="tasks" element={<Tasks />} />
</Route>
```

### Типичная ошибка

Не добавить Outlet и искать причину отсутствия страницы в загрузке данных.

### Для закрепления

- [Какие состояния интерфейса стоит хранить в URL и как избежать второго источника истины?](/questions/react-url-state)

- [Что делает BrowserRouter и чем клиентский переход отличается от полной загрузки документа?](/questions/react-router-browser-history)

### Источник

[React Router: routing](https://reactrouter.com/7.18.5/start/declarative/routing)
