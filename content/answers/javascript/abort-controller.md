**У обычного `Promise` нет универсального метода отмены.**

<!-- wishu:answer-block -->

### Как это работает

`AbortController` создаёт signal, который передают операции, поддерживающей отмену, например fetch. Abort запрашивает остановку; API должно само учитывать сигнал.

Один signal можно использовать для связанных операций, но после отмены он не становится снова активным. `Promise` запроса при отмене обычно отклоняется AbortError, если не задана другая причина.

Отмена не гарантирует, что сервер не успел обработать запрос, и не откатывает уже выполненные действия. В своём API нужно учитывать уже отменённый signal и освобождать обработчики после завершения; простой reject не останавливает внешнюю работу.

### Пример и его разбор

```javascript
async function load(url, signal) {
  const response = await fetch(url, { signal })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return await response.json()
}
const controller = new AbortController()
// load(url, controller.signal) вызывают с обработкой отклонения.
// controller.abort() запрашивает отмену поддерживаемой операции.
```

Функция load передаёт signal именно fetch, то есть участнику, умеющему на него реагировать. Controller управляет сигналом, а возвращённый `Promise` сообщает наблюдённый исход. Создание контроллера само не отменяет запрос; требуется вызов abort. Даже успешная клиентская отмена не является откатом серверной операции, которая уже могла завершиться.

### Источники

[MDN: Guide / Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
