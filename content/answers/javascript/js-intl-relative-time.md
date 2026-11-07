**RelativeTimeFormat форматирует уже вычисленное число единиц относительно точки отсчёта. Он не выбирает за приложение, когда момент считается вчерашним днём или сколько календарных месяцев прошло.**

<!-- wishu:answer-block -->

### Механизм и границы

Разницу и единицу выбирают отдельно с учётом часового пояса и UX. Numeric: auto позволяет словесные варианты там, где они предусмотрены locale, а always сохраняет числовую форму.

Текст следует обновлять по подходящему расписанию и не хранить как единственный источник исходного timestamp.

<!-- wishu:answer-block -->

### Источник

[MDN: Global_Objects/Intl/RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat).
