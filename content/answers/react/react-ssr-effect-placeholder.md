**Эффекты не выполняются при серверном рендеринге, поэтому данные, получаемые только в `useEffect`, не попадут в исходный HTML.**

<!-- wishu:answer-block -->

### Механизм и границы

- Сервер покажет начальное состояние компонента: placeholder, пустой список или другой заданный UI.

- Чтобы получить содержимое на сервере, нужен серверный механизм загрузки или интеграция фреймворка; сам `useEffect` этого не обеспечивает.

### Пример

```jsx
const [rows, setRows] = useState(null)
useEffect(() => {
  loadRows().then(setRows)
}, [])
return rows ? <List rows={rows} /> : <p>Загрузка…</p>
```

### Типичная ошибка

Ожидать, что сервер дождётся эффекта перед отправкой HTML.

### Для закрепления

- [Что такое гидратация и почему возникает hydration mismatch?](/questions/react-hydration)

### Источник

[React: useEffect](https://react.dev/reference/react/useEffect)
