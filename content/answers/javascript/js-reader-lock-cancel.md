**ReleaseLock снимает связь reader с потоком, а cancel сообщает, что дальнейшие данные не нужны, с последствиями для underlying source. Это не два имени одной операции.**

<!-- wishu:answer-block -->

### Как это работает

У потока есть ограничения на одновременно активных readers и состояние ожидающих read. Освобождение lock должно соответствовать выбранному контракту завершения, а не случайно выполняться пока нужная операция ещё зависит от reader.

При досрочном выходе решите, должен ли источник продолжить жить для другого читателя или быть отменён. Ошибки чтения и отмены также нужно обработать.

### Пример и его разбор

```javascript
async function firstChunk(stream) {
  const reader = stream.getReader()
  try {
    const item = await reader.read()
    await reader.cancel("дальше не нужно")
    return item
  } finally {
    reader.releaseLock()
  }
}
```

FirstChunk явно сообщает источнику, что остальные данные не нужны, через cancel. Затем `finally` освобождает reader независимо от исхода. Один releaseLock позволил бы другому читателю продолжить работу, но сам по себе не означает прекращение получения данных.

### Типичная ошибка

> Использовать releaseLock как гарантию прекращения сетевой загрузки.

### Для закрепления

- [Как ReadableStream и WritableStream обрабатывают данные по частям?](/questions/streams)
- [Почему Response нельзя прочитать через json() дважды и что даёт clone()?](/questions/js-response-body-ownership)

### Источники

[MDN: ReadableStreamDefaultReader](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStreamDefaultReader)
