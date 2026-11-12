**User Timing позволяет помечать этапы и измерять интервал между ними, включая асинхронное ожидание. Это помогает связывать загрузку, обработку и показ результата, а не только замерять одну функцию.**

<!-- wishu:answer-block -->

### Как это работает

Назначьте уникальные имена при параллельных операциях и очищайте ненужные entries. PerformanceObserver позволяет получать поддерживаемые записи, но доступность конкретных entry types и cross-origin деталей различается.

Измеренный интервал включает всё выбранное ожидание; его нельзя автоматически назвать временем выполнения JavaScript или доказательством, что пользователь увидел кадр ровно на вашей mark.

### Пример и его разбор

```javascript
async function measured(load, report) {
  const id = crypto.randomUUID()
  const start = id + ":start",
    end = id + ":end"
  performance.mark(start)
  try {
    return await load()
  } finally {
    performance.mark(end)
    const entry = performance.measure(id, start, end)
    performance.clearMarks(start)
    performance.clearMarks(end)
    performance.clearMeasures(id)
    report(entry) // Контракт: синхронный reporter не выбрасывает ошибку.
  }
}
```

Уникальный id разделяет параллельные измерения. `finally` завершает интервал и при успехе, и при отказе, после чего записи очищаются. Требование к report существенно: выброшенная им ошибка из `finally` могла бы заменить первоначальный результат операции.

### Типичная ошибка

> Приравнивать время сетевого `async`-процесса к чистой стоимости CPU.

### Источники

[MDN: Performance/mark](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark)
