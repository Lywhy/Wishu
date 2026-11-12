**DateTimeFormat форматирует значение согласно locale и options, включая timeZone. Он не меняет сам timestamp и не превращает дату в другой сохранённый момент.**

<!-- wishu:answer-block -->

### Как это работает

При SSR сервер и клиент могут иметь разные defaults. Передавайте согласованные locale/timeZone там, где первый результат обязан совпасть. Для составного UI используйте `formatToParts`, а не разбор готовой строки по запятой.

Точная пунктуация и пробелы могут зависеть от locale data. Локализованная строка не предназначена для обратного машинного парсинга.

### Пример и его разбор

```javascript
const formatter = new Intl.DateTimeFormat("ru-RU", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
})
const parts = formatter.formatToParts(new Date("2024-01-01T12:00:00Z"))
// parts сохраняет роли элементов, не требуя split локализованной строки.
```

Formatter явно фиксирует UTC и ru-RU, поэтому результат не зависит от локального пояса машины по умолчанию. Parts возвращает роли отдельных фрагментов для оформления. Это позволяет не угадывать разделители и не разбирать локализованную строку обратно.

### Типичная ошибка

> Сохранять пользовательскую дату как результат locale-format и затем разбирать его обратно.

### Источники

[MDN: Global_Objects/Intl/DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
