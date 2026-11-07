**Порядок: **start → get → end → call → ok**.**

<!-- wishu:answer-block -->

### Механизм и границы

Свойство then получается при обработке значения. Сам подходящий thenable-метод вызывается через механизм Promise job, поэтому не выполняется между get и синхронным end. Последующий обработчик получает разрешённое ok позже.

Для ошибочного getter и повторных resolve/reject действуют отдельные гарантии алгоритма разрешения.

<!-- wishu:answer-block -->

### Для закрепления

- [Как Promise обрабатывает thenable с ошибочным getter или повторными вызовами resolve?](/questions/js-thenable-assimilation)
- [Как связаны стек вызовов, задачи и микрозадачи в event loop?](/questions/event-loop)

<!-- wishu:answer-block -->

### Источник

[ECMAScript: актуальный living draft](https://tc39.es/ecma262/).
