**Эффекты не выполняются при серверном рендеринге, поэтому данные, получаемые только в `useEffect`, не попадут в исходный HTML.**

<!-- wishu:answer-block -->

#### Как это работает

Сервер покажет начальное состояние компонента: placeholder, пустой список или другой заданный UI. Чтобы получить содержимое на сервере, нужен серверный механизм загрузки или интеграция фреймворка; сам `useEffect` этого не обеспечивает.

#### Пример

```jsx
const [rows, setRows] = useState(null)
const [error, setError] = useState(null)
useEffect(() => {
  let active = true
  loadRows().then(
    (data) => {
      if (active) setRows(data)
    },
    (cause) => {
      if (active) setError(cause)
    },
  )
  return () => {
    active = false
  }
}, [])
if (error) return <p role="alert">Не удалось загрузить данные</p>
return rows ? <List rows={rows} /> : <p>Загрузка…</p>
// loadRows - стабильная функция модуля; active не отменяет сам запрос.
```

#### Разбор примера

Начальные `rows` равны null, поэтому сервер возвращает «Загрузка…». Эффект начнётся лишь на клиенте и не задержит выдачу HTML. Учебная схема также требует обработки отказа и устаревшего ответа, если её использовать для настоящего запроса.

#### Типичная ошибка

Ожидать, что сервер дождётся эффекта перед отправкой HTML.

#### Для закрепления

- [Что такое гидратация и почему возникает hydration mismatch?](/questions/react-hydration)

#### Источники

[React: useEffect](https://react.dev/reference/react/useEffect)
