**Lookaround проверяет условие справа или слева от позиции, не добавляя сам проверяемый контекст в потреблённый диапазон. У положительных и отрицательных проверок разный смысл.**

<!-- wishu:answer-block -->

### Механизм и границы

Это полезно для извлечения фрагмента с нужным окружением. Но нулевая ширина не означает нулевую вычислительную стоимость; сложные вложенные проверки могут сделать шаблон непонятным и дорогим.

Проверяйте поддержку lookbehind и особенности Unicode в нужном runtime. Иногда явный захват с простым шаблоном лучше сложного lookaround.

<!-- wishu:answer-block -->

### Источник

[MDN: Regular_expressions/Lookahead_assertion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookahead_assertion).
