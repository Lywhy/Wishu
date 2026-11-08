**Data Router координирует конкурирующие навигации и может отменить устаревшее клиентское ожидание, но сервер мог уже начать обработку запроса.**

<!-- wishu:answer-block -->

### Механизм и границы

- Loader должен передавать request.signal поддерживающей сети; произвольный fetch без signal не получает отмену сам.

- Отмена клиентского запроса не гарантирует отмену серверной мутации. Для важных записей нужны серверная версия, идемпотентность или другой предметный протокол.

- Отличайте выбор актуального UI от гарантии порядка операций на сервере.

### Пример

```jsx
async function loader({ request, params }) {
  const response = await fetch("/api/users/" + params.id, { signal: request.signal })
  if (!response.ok) throw response
  return response.json()
}
```

### Типичная ошибка

Считать, что новый переход гарантированно остановил прежний POST на сервере.

### Для закрепления

- [Какие состояния интерфейса стоит хранить в URL и как избежать второго источника истины?](/questions/react-url-state)

- [Что делает BrowserRouter и чем клиентский переход отличается от полной загрузки документа?](/questions/react-router-browser-history)

### Источник

[React Router: race-conditions](https://reactrouter.com/explanation/race-conditions)
