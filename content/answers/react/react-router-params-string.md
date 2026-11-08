**Параметр URL является строкой, а его наличие и формат требуют проверки перед прикладным использованием.**

<!-- wishu:answer-block -->

### Механизм и границы

- TypeScript-тип не превращает сегмент URL в число и не доказывает существование записи.

- Для числового ID обработайте отсутствие, некорректную запись и диапазон; при ошибке покажите корректный маршрутный результат.

### Пример

```jsx
const { id } = useParams()
const numericId = Number(id)
const valid = id !== undefined && Number.isSafeInteger(numericId) && numericId > 0
```

### Типичная ошибка

Передать непроверенный id в расчёт и считать URL доверенными данными.

### Для закрепления

- [Какие состояния интерфейса стоит хранить в URL и как избежать второго источника истины?](/questions/react-url-state)

- [Что делает BrowserRouter и чем клиентский переход отличается от полной загрузки документа?](/questions/react-router-browser-history)

### Источник

[React Router: useParams](https://reactrouter.com/7.18.5/api/hooks/useParams)
