**DateTimeFormat форматирует значение согласно locale и options, включая timeZone. Он не меняет сам timestamp и не превращает дату в другой сохранённый момент.**

<!-- wishu:answer-block -->

### Механизм и границы

При SSR сервер и клиент могут иметь разные defaults. Передавайте согласованные locale/timeZone там, где первый результат обязан совпасть. Для составного UI используйте formatToParts, а не разбор готовой строки по запятой.

Точная пунктуация и пробелы могут зависеть от locale data. Локализованная строка не предназначена для обратного машинного парсинга.

<!-- wishu:answer-block -->

### Источник

[MDN: Global_Objects/Intl/DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat).
