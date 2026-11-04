# JavaScript - Основы языка: разбор списка

54 исходные формулировки покрываются 37 вопросами: 36 в «Основах языка» и существующий вопрос о замыканиях в «Функциях». Добавлено 33 новых вопроса, уточнены 3 существующих; вопрос о замыканиях используется без дублирования. Каждый добавленный вопрос содержит ответ, пример, краткое описание, вывод и сложность.

ID equality, variables, null-undefined и closures сохранены. Другие существующие вопросы не удаляются и не перемещаются. Объектные операции из входного списка оставлены в «Основах языка»: они рассматриваются на вводном уровне, а вопрос о цепочке прототипов остаётся отдельным углублением.

## Соответствие исходных пунктов

Номера относятся к исходному списку. Несколько номеров в строке означают объединение в одну учебную цель.

| Пункты     | Итоговый вопрос                                                                | Подраздел                     | ID                               |
| ---------- | ------------------------------------------------------------------------------ | ----------------------------- | -------------------------------- |
| 1          | Какие типы данных есть в JavaScript?                                           | Основы языка                  | `data-types`                     |
| 2          | Чем отличаются == и ===?                                                       | Основы языка                  | `equality`                       |
| 3          | Чем отличаются var, let и const?                                               | Основы языка                  | `variables`                      |
| 4          | В чём разница между null и undefined?                                          | Основы языка                  | `null-undefined`                 |
| 5          | Что такое область видимости переменной?                                        | Основы языка                  | `scope`                          |
| 6, 7       | Что такое hoisting и что произойдёт при обращении к переменной до объявления?  | Основы языка                  | `hoisting`                       |
| 8          | Что означает динамическая типизация JavaScript?                                | Основы языка                  | `dynamic-typing`                 |
| 9, 10      | Как работает typeof и почему typeof null возвращает "object"?                  | Основы языка                  | `typeof`                         |
| 11         | Что такое NaN и как его правильно проверить?                                   | Основы языка                  | `nan`                            |
| 12, 13, 14 | Как работают преобразования типов и почему [] == false даёт true?              | Основы языка                  | `type-coercion`                  |
| 15, 29     | Как объединять строки и использовать шаблонные литералы?                       | Основы языка                  | `string-concatenation-templates` |
| 16         | Чем отличаются префиксные и постфиксные ++ и --?                               | Основы языка                  | `increment-decrement`            |
| 17, 18, 27 | Какие значения являются falsy и как работают ! и !!?                           | Основы языка                  | `truthy-falsy`                   |
| 19, 28, 39 | Как проверить наличие свойства и что возвращает отсутствующее свойство?        | Основы языка                  | `property-presence`              |
| 20         | Что делает оператор delete?                                                    | Основы языка                  | `delete-operator`                |
| 21         | Как работает instanceof и какие у него ограничения?                            | Основы языка                  | `instanceof-operator`            |
| 22, 40     | Как создать объект и что делает оператор new?                                  | Основы языка                  | `object-creation-new`            |
| 23         | Для чего нужен оператор void?                                                  | Основы языка                  | `void-operator`                  |
| 24, 44     | Когда использовать if, switch и тернарный оператор?                            | Основы языка                  | `conditional-statements`         |
| 25         | Как работает && и какое значение он возвращает?                                | Основы языка                  | `logical-and`                    |
| 26         | Чем оператор ?? отличается от \|\|?                                            | Основы языка                  | `nullish-coalescing`             |
| 30, 31     | Что такое JSON и как работают JSON.parse и JSON.stringify?                     | Основы языка                  | `json-format`                    |
| 32         | Как надёжно проверить, что значение является массивом?                         | Основы языка                  | `array-detection`                |
| 33, 34     | Как передаются примитивы и объекты: по значению или по ссылке?                 | Основы языка                  | `value-and-reference`            |
| 35         | Что такое изменяемые и неизменяемые данные?                                    | Основы языка                  | `mutability`                     |
| 36         | Что такое Symbol и где его используют?                                         | Основы языка                  | `symbol`                         |
| 37         | Чем BigInt отличается от Number?                                               | Основы языка                  | `bigint-number`                  |
| 38         | Что такое замыкание и когда оно полезно?                                       | Функции - существующий вопрос | `closures`                       |
| 41         | Как работает spread и насколько глубоко он копирует данные?                    | Основы языка                  | `spread`                         |
| 42, 52     | Как выбрасывать и обрабатывать ошибки в JavaScript?                            | Основы языка                  | `error-handling`                 |
| 43         | Как работает optional chaining (?.)?                                           | Основы языка                  | `optional-chaining`              |
| 45, 47, 48 | Чем отличаются break и continue и зачем break в switch?                        | Основы языка                  | `break-continue`                 |
| 46         | Какие циклы есть в JavaScript и когда их использовать?                         | Основы языка                  | `loops`                          |
| 49, 50     | Чем отличаются for...in и for...of?                                            | Основы языка                  | `for-in-for-of`                  |
| 51         | Что такое метки и как они работают с break и continue?                         | Основы языка                  | `labels`                         |
| 53         | Как устроены глобальные переменные и чем они отличаются от свойств globalThis? | Основы языка                  | `global-variables`               |
| 54         | Почему eval опасен и чем его заменить?                                         | Основы языка                  | `eval-risks`                     |

## Решения по объединению

- 6 + 7: обращение до объявления объясняется через hoisting, инициализацию var и TDZ.
- 9 + 10: typeof null - особый случай того же оператора.
- 12 + 13 + 14: явные и неявные преобразования раскрыты на примере [] == false; отдельно сохранены правила сравнения == и ===.
- 15 + 29: конкатенация и шаблонные литералы - способы сборки строк.
- 17 + 18 + 27: ! и !! объяснены через преобразование truthy/falsy.
- 19 + 28 + 39: чтение отсутствующего свойства и проверка наличия сопоставлены через in и Object.hasOwn.
- 22 + 40: new рассмотрен как один из способов создания объекта, с объяснением конструктора.
- 24 + 44: тернарный оператор сопоставлен с условными конструкциями.
- 30 + 31: формат JSON объяснён вместе с parse/stringify и ограничениями сериализации.
- 33 + 34: модель примитивов и ссылок объясняет передачу аргументов; детали стека и кучи не выдаются за гарантию языка.
- 42 + 52: throw объяснён вместе с обработкой ошибок.
- 45 + 47 + 48: break и continue сопоставлены, в том числе поведение break внутри switch.
- 49 + 50: for...in и for...of сопоставлены в одном вопросе; общий обзор циклов сохранён отдельно.
- 37: название BigInt vs Int исправлено на BigInt и Number; отдельного типа Int в JavaScript нет.
- 38: точный смысловой дубль вопроса о замыканиях из «Функций»; новая запись не создаётся.

## Источники для спорных нюансов

- [MDN: типы и объявления](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types).
- [MDN: typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof), [NaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN), [нестрогое равенство](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality).
- [MDN: BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt), [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol).
- [MDN: Object.hasOwn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn), [new](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new), [delete](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete), [instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof).
- [MDN: spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax), [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining), [nullish coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing).
- [MDN: JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON), [циклы](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration), [ошибки](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling), [eval](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval).

- [MDN: передача аргументов](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions), [for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in), [метки](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label).
- [MDN: JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify), [Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze), [var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var), [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let).

## Применение

Из корня проекта выполнить `pnpm db:seed`. Seed обновляет записи по ID и добавляет новые; существующие отметки и избранное сохраняются. Сервер, сборка, проверки и команды базы при подготовке контента не запускались.
