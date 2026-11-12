**`SharedArrayBuffer` даёт общую память, но сам не делает сложные изменения атомарными. Atomics предоставляет операции над поддерживаемыми integer typed views и правила синхронизации между агентами.**

<!-- wishu:answer-block -->

### Как это работает

Load/store/add/compareExchange решают конкретные шаги, а согласованный протокол нужен всему алгоритму. Несколько атомарных операций не становятся одной общей транзакцией.

В браузере общая память требует подходящей изоляции и поддержки. Не используйте busy waiting на главном потоке; согласуйте блокирующее или асинхронное ожидание и отмену.

### Пример и его разбор

```javascript
const memory = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT)
const counter = new Int32Array(memory)
Atomics.add(counter, 0, 1)
console.log(Atomics.load(counter, 0)) // 1 в этом отдельном примере.
```

Atomics.add выполняет чтение, изменение и запись ячейки одной атомарной операцией. Обычный count++ состоит из отдельных шагов и при конкуренции может терять обновления. Для нескольких связанных полей всё равно нужен согласованный протокол публикации состояния.

### Типичная ошибка

> Считать count++ безопасным межпоточным инкрементом без Atomics.

### Для закрепления

- [Как SharedArrayBuffer позволяет разделять память между агентами?](/questions/shared-array-buffer)

### Источники

[MDN: Global_Objects/Atomics](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics)
