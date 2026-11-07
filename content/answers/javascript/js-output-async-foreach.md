Будут выведены **0**, затем **2**. forEach не ожидает промисы callback-функций.

<!-- wishu:answer-block -->

Оба callback доходят до await и приостанавливаются. Первый console.log выполняется синхронно. Продолжения callback уже поставлены в очередь раньше продолжения main, поэтому к второму console.log массив содержит два элемента.

- Для последовательных операций: `for (const value of values) { result.push(await work(value)) }`.
- Для параллельных: `const result = await Promise.all(values.map(work))`.

В этом примере порядок определён уже выполненными Promise. Для реальных запросов порядок завершения может отличаться. [MDN: forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).
