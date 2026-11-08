**BrowserRouter согласует React-маршруты с History API браузера, позволяя менять экран без полной загрузки документа.**

<!-- wishu:answer-block -->

### Механизм и границы

- React Router - отдельная библиотека, не встроенный API ядра React.

- Для нового документа и внешнего сайта остаются обычные ссылки. Сервер хостинга должен поддерживать открытие клиентского пути напрямую.

### Пример

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/learn" element={<Learn />} />
  </Routes>
</BrowserRouter>
```

### Типичная ошибка

Считать, что BrowserRouter сам настраивает HTTP-сервер или API-маршруты.

### Для закрепления

- [Какие состояния интерфейса стоит хранить в URL и как избежать второго источника истины?](/questions/react-url-state)

### Источник

[React Router: routing](https://reactrouter.com/7.18.5/start/declarative/routing)
