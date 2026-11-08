**Запрос может завершиться сетевым отказом, получить HTTP-ошибку или не суметь прочитать и проверить полученное тело.**

<!-- wishu:answer-block -->

### Механизм и границы

- Fetch не отклоняет Promise только из-за 404/500: статус проверяют отдельно.

- Прочитанный JSON может не соответствовать схеме приложения. Отмена является отдельным ожидаемым исходом, а не обязательно аварией.

### Сценарий

Сервер вернул HTML с 502, а вызов json() дал ошибку парсинга: первичный HTTP-сбой нужно не потерять.

```javascript
async function loadItems() {
  const response = await fetch("/api/items")
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }
  return response.json()
}
// fetch, проверка status и разбор JSON могут завершиться разными ошибками.
```

### Типичная ошибка

Отобразить любую ошибку как «нет интернета» или считать любой resolved Promise бизнес-успехом.

### Для закрепления

- [Как выполнять запросы через fetch с async/await и проверять HTTP-ошибки?](/questions/async-fetch)

### Источники

- [Использование Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
