**В Data Router action обрабатывает мутацию маршрута, после которой router может обновить связанные loader-данные.**

<!-- wishu:answer-block -->

### Механизм и границы

- Пользовательская форма через поддерживаемые Form/submit API связывает pending-состояние и результат с навигацией.

- Обычный fetch внутри onClick не становится router action автоматически. Revalidation должна следовать контракту режима и настройкам, а не предположению, что любой POST обновляет всё.

### Пример

```jsx
<Form method="post">
  <input name="title" />
  <button>Сохранить</button>
</Form>
// В конфигурации маршрута отдельно определён action.
```

### Типичная ошибка

Сделать мутацию вне router и ожидать, что useLoaderData сам узнает об изменении сервера.

### Для закрепления

- [Какие состояния интерфейса стоит хранить в URL и как избежать второго источника истины?](/questions/react-url-state)

- [Что делает BrowserRouter и чем клиентский переход отличается от полной загрузки документа?](/questions/react-router-browser-history)

### Источник

[React Router: route-object](https://reactrouter.com/7.18.5/start/data/route-object)
