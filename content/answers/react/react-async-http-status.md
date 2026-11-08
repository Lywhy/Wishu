**Fetch обычно отклоняет Promise при сетевой ошибке, но ответ HTTP 404/500 нужно проверять отдельно.**

<!-- wishu:answer-block -->

### Механизм и границы

- Проверьте response.ok либо допустимые статусы, затем обработайте тело по контракту API.

- Ошибка JSON-парсинга - ещё один сценарий. В React переведите операцию в состояние ошибки и не оставляйте прежний loading.

### Пример

```jsx
const response = await fetch("/api/items")
if (!response.ok) throw new Error("Не удалось загрузить данные")
const rows = await response.json()
```

### Типичная ошибка

Считать любой resolved fetch успешным прикладным результатом.

### Для закрепления

- [Как предотвратить гонку ответов при загрузке данных в эффекте?](/questions/react-fetch-races)

### Источник

[MDN: Using_Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
