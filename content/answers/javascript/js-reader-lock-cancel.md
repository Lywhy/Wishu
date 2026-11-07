**ReleaseLock снимает связь reader с потоком, а cancel сообщает, что дальнейшие данные не нужны, с последствиями для underlying source. Это не два имени одной операции.**

<!-- wishu:answer-block -->

### Механизм и границы

У потока есть ограничения на одновременно активных readers и состояние ожидающих read. Освобождение lock должно соответствовать выбранному контракту завершения, а не случайно выполняться пока нужная операция ещё зависит от reader.

При досрочном выходе решите, должен ли источник продолжить жить для другого читателя или быть отменён. Ошибки чтения и отмены также нужно обработать.

<!-- wishu:answer-block -->

### Для закрепления

- [Как ReadableStream и WritableStream обрабатывают данные по частям?](/questions/streams)
- [Почему Response нельзя прочитать через json() дважды и что даёт clone()?](/questions/js-response-body-ownership)

<!-- wishu:answer-block -->

### Источник

[MDN: ReadableStreamDefaultReader](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStreamDefaultReader).
