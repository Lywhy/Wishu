**Test отвечает на вопрос о наличии, exec возвращает один результат с захватами, а match и matchAll имеют разные формы результата и правила взаимодействия с флагами.**

<!-- wishu:answer-block -->

### Механизм и границы

Match с g не предоставляет тот же набор групп, что единичный match. MatchAll даёт iterable результатов и требует соответствующего global-контракта для переданного RegExp. При прямом exec/test с g или y отдельно учитывайте lastIndex.

Для простого наличия подстроки регулярное выражение может быть лишним. Не вызывайте повторно stateful test как будто это чистый предикат.

<!-- wishu:answer-block -->

### Для закрепления

- [Почему test с регулярным выражением /g может чередовать true и false?](/questions/regexp-last-index)

<!-- wishu:answer-block -->

### Источник

[MDN: Global_Objects/String/matchAll](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll).
