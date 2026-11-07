**Различия заметны у NaN и знакового нуля.** `Object.is` считает NaN равным NaN, но различает +0 и -0. SameValueZero считает равными и NaN, и знаковые нули.

<!-- wishu:answer-block -->

### Сравнение алгоритмов

| Пара | === | Object.is | SameValueZero |
| --- | --- | --- | --- |
| `NaN`, `NaN` | false | true | true |
| `+0`, `-0` | true | false | true |
| Два разных объекта | false | false | false |

<!-- wishu:answer-block -->

### Где это встречается

- `includes`, Set и Map используют семантику SameValueZero.
- `indexOf` использует строгое равенство, поэтому не находит NaN.
- Ни один из этих алгоритмов не сравнивает содержимое разных объектов.
