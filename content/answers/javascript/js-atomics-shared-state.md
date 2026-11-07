**SharedArrayBuffer даёт общую память, но сам не делает сложные изменения атомарными. Atomics предоставляет операции над поддерживаемыми integer typed views и правила синхронизации между агентами.**

<!-- wishu:answer-block -->

### Механизм и границы

Load/store/add/compareExchange решают конкретные шаги, а согласованный протокол нужен всему алгоритму. Несколько атомарных операций не становятся одной общей транзакцией.

В браузере общая память требует подходящей изоляции и поддержки. Не используйте busy waiting на главном потоке; согласуйте блокирующее или асинхронное ожидание и отмену.

<!-- wishu:answer-block -->

### Для закрепления

- [Как SharedArrayBuffer позволяет разделять память между агентами?](/questions/shared-array-buffer)

<!-- wishu:answer-block -->

### Источник

[MDN: Global_Objects/Atomics](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics).
