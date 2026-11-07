**Обратная косая черта в исходнике может задавать escape-последовательность. Runtime-строка уже содержит результат разбора, а не обязательно те же символы, что видны в файле.**

<!-- wishu:answer-block -->

### Механизм и границы

String.raw в tagged template позволяет получить raw-части шаблона; подстановки при этом всё ещё вычисляются. При построении RegExp через строку есть два уровня разбора: JavaScript-литерал и регулярное выражение.

Путь Windows, JSON, HTML и регулярное выражение имеют разные грамматики. Универсального «экранировать строку один раз для всего» нет.

<!-- wishu:answer-block -->

### Источник

[MDN: Global_Objects/String/raw](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw).
