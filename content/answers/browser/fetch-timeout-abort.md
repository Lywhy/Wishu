**Тайм-аут ограничивает приемлемую длительность ожидания, а abort запрашивает отмену поддерживающей signal операции.**

<!-- wishu:answer-block -->

### Механизм и границы

- Завершение ожидания через Promise.race не обязательно останавливает сеть.

- Сервер мог уже обработать запрос; abort не откатывает его эффект. Повтор мутации требует отдельной политики.

### Сценарий

Клиент перестал ждать создание заказа через пять секунд, но заказ мог быть создан; перед повтором нужен ключ операции или проверка результата.

```javascript
async function loadWithTimeout() {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 5000)
  try {
    const response = await fetch("/api/items", { signal: controller.signal })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return await response.json()
  } finally {
    clearTimeout(timer)
  }
}
// Abort не откатывает уже выполненное серверное изменение.
```

### Типичная ошибка

Считать истечение таймера доказательством отсутствия серверного изменения.

### Для закрепления

- [Можно ли отменить Promise и как помогают AbortController и AbortSignal?](/questions/abort-controller)

### Источники

- [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
