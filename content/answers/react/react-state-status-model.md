**Один status удобнее независимых boolean, когда состояния взаимно исключают друг друга.** Так сложнее получить одновременно успешную отправку, загрузку и ошибку.

<!-- wishu:answer-block -->

### Как это работает

- Сначала перечислите допустимые состояния и переходы: idle -> pending -> success или error.

- Данные ответа и текст ошибки связывайте с соответствующим состоянием. Несвязанные флаги вроде раскрытой подсказки могут оставаться отдельными.

- Для сложных переходов подходит reducer. Строковый status сам не отменяет старый запрос и не решает гонки: это отдельная часть модели асинхронной операции.

### Пример

```jsx
const [request, setRequest] = useState({ status: "idle" })
setRequest({ status: "pending" })
// После успешной операции:
setRequest({ status: "success", data: result })
const canSubmit = request.status !== "pending"
```

### Типичная ошибка

Хранить isLoading, isSuccess и isError отдельно и сбрасывать только один из них при повторной отправке.

### Источники

- [React: learn / choosing-the-state-structure](https://react.dev/learn/choosing-the-state-structure)
