**Mutex сериализует доступ к одной критической секции, а pool ограничивает количество одновременно выполняемых задач. Эти цели могут совпасть при limit = 1, но API и модель владения требуют явного выбора.**

<!-- wishu:answer-block -->

### Механизм и границы

Освобождение должно происходить при успехе и исключении. Определите порядок очереди, отмену ожидающего, reentrancy и риск deadlock. Локальный mutex не синхронизирует другие вкладки, процессы или клиентов сервера.

Пример ниже показывает минимальную FIFO-сериализацию без reentrancy и отмены; повторно ожидать ту же секцию из неё самой нельзя.

<!-- wishu:answer-block -->

### Для закрепления

- [Как возникает race condition в однопоточном JavaScript?](/questions/js-await-race-condition)

<!-- wishu:answer-block -->

### Источник

[MDN: Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
