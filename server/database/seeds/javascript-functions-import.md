# JavaScript - Функции: разбор списка

65 исходных пунктов покрываются 41 самостоятельным вопросом. Добавлен 31 новый вопрос с ответом, примером кода, описанием, выводом и сложностью. В «Функциях» теперь 32 вопроса: новые и существующее замыкание. Ещё 9 существующих вопросов переиспользованы в своих подразделах: 8 в «Основах языка» и 1 в «Асинхронности».

Существующие ID, содержание и связи вопросов сохранены. У вопроса closures меняется только порядок внутри «Функций». SQL-миграции, API и интерфейс не менялись. Объединений нескольких сохранённых ID нет: объединяются только входные формулировки, поэтому перенос прогресса не требуется.

## Соответствие исходных пунктов

Номера соответствуют исходному списку. Несколько номеров в строке означают общий вопрос.

| Пункты             | Итоговый вопрос                                                                | Подраздел     | Результат                             | ID                             |
| ------------------ | ------------------------------------------------------------------------------ | ------------- | ------------------------------------- | ------------------------------ |
| 1, 15              | Чем стрелочные функции отличаются от обычных и когда их не стоит использовать? | Функции       | Новый вопрос                          | `arrow-functions`              |
| 2, 3, 4            | Чем отличаются Function Declaration и Function Expression?                     | Функции       | Новый вопрос                          | `function-declarations`        |
| 5                  | Что такое hoisting и что произойдёт при обращении к переменной до объявления?  | Основы языка  | Существующий вопрос; без дублирования | `hoisting`                     |
| 6                  | Что возвращает функция без return?                                             | Функции       | Новый вопрос                          | `function-return`              |
| 7                  | Как передаются примитивы и объекты: по значению или по ссылке?                 | Основы языка  | Существующий вопрос; без дублирования | `value-and-reference`          |
| 8, 36              | Что такое замыкание и когда оно полезно?                                       | Функции       | Существующий вопрос; ID сохранён      | `closures`                     |
| 9, 22, 34          | От чего зависит this внутри функции?                                           | Функции       | Новый вопрос                          | `function-this`                |
| 10, 13             | Что такое arguments и есть ли он у стрелочной функции?                         | Функции       | Новый вопрос                          | `function-arguments`           |
| 11                 | Как работают rest-параметры и чем они отличаются от arguments?                 | Функции       | Новый вопрос                          | `rest-parameters`              |
| 12                 | Когда срабатывают параметры по умолчанию?                                      | Функции       | Новый вопрос                          | `default-parameters`           |
| 14                 | Как работает spread и насколько глубоко он копирует данные?                    | Основы языка  | Существующий вопрос; без дублирования | `spread`                       |
| 16                 | Что такое IIFE и зачем её используют?                                          | Функции       | Новый вопрос                          | `iife`                         |
| 17                 | Как работает конструктор Function и чем он отличается от обычной функции?      | Функции       | Новый вопрос                          | `function-constructor`         |
| 18, 19, 20         | Чем отличаются Function.prototype.call и apply?                                | Функции       | Новый вопрос                          | `call-apply`                   |
| 21                 | Что возвращает bind и как он связывает this и аргументы?                       | Функции       | Новый вопрос                          | `function-bind`                |
| 23                 | Что возвращает toString у функции?                                             | Функции       | Новый вопрос                          | `function-to-string`           |
| 24                 | Что такое фабричная функция и чем она отличается от конструктора?              | Функции       | Новый вопрос                          | `factory-functions`            |
| 25, 26             | Что такое функция-обёртка и как с её помощью декорировать поведение?           | Функции       | Новый вопрос                          | `function-wrappers`            |
| 27, 28, 29, 30, 31 | Как работают function*, yield и return в генераторе?                           | Функции       | Новый вопрос                          | `generator-functions`          |
| 32, 33             | Как связаны генераторы, итераторы и Symbol.iterator?                           | Функции       | Новый вопрос                          | `iterator-protocols`           |
| 35                 | Почему функция теряет this при передаче метода в callback?                     | Функции       | Новый вопрос                          | `lost-this`                    |
| 37                 | Почему var в цикле приводит к неожиданным значениям в замыканиях?              | Функции       | Новый вопрос                          | `closures-in-loops`            |
| 38                 | Что такое область видимости переменной?                                        | Основы языка  | Существующий вопрос; без дублирования | `scope`                        |
| 39                 | Чем отличаются var, let и const?                                               | Основы языка  | Существующий вопрос; без дублирования | `variables`                    |
| 40                 | Что меняет "use strict" и где строгий режим уже включён?                       | Функции       | Новый вопрос                          | `strict-mode`                  |
| 41                 | Как устроены глобальные переменные и чем они отличаются от свойств globalThis? | Основы языка  | Существующий вопрос; без дублирования | `global-variables`             |
| 42, 44, 45         | Что такое callback и кто определяет его аргументы?                             | Функции       | Новый вопрос                          | `callback-functions`           |
| 43                 | Что такое callback hell и как уменьшить вложенность?                           | Функции       | Новый вопрос                          | `callback-hell`                |
| 46                 | Чем синхронный callback отличается от асинхронного?                            | Функции       | Новый вопрос                          | `sync-async-callbacks`         |
| 47                 | В каком порядке выполняются задачи в event loop?                               | Асинхронность | Существующий вопрос; без дублирования | `event-loop`                   |
| 48, 49, 50         | Что такое рекурсия и зачем ей базовый случай?                                  | Функции       | Новый вопрос                          | `recursion`                    |
| 51                 | Что такое хвостовая рекурсия и гарантирует ли она экономию стека?              | Функции       | Новый вопрос                          | `tail-recursion`               |
| 52, 53             | Как избежать переполнения стека и заменить глубокую рекурсию циклом?           | Функции       | Новый вопрос                          | `recursion-depth`              |
| 54                 | Что такое функция высшего порядка?                                             | Функции       | Новый вопрос                          | `higher-order-functions`       |
| 55, 56             | Что такое чистая функция и какие действия считаются побочными эффектами?       | Функции       | Новый вопрос                          | `pure-functions`               |
| 57                 | Что означает функция без состояния и обязательно ли она чистая?                | Функции       | Новый вопрос                          | `stateless-functions`          |
| 58                 | Что такое изменяемые и неизменяемые данные?                                    | Основы языка  | Существующий вопрос; без дублирования | `mutability`                   |
| 59, 60, 61         | Чем каррирование отличается от частичного применения?                          | Функции       | Новый вопрос                          | `currying-partial-application` |
| 62, 63             | Что такое композиция функций и как реализовать compose?                        | Функции       | Новый вопрос                          | `function-composition`         |
| 64                 | Что такое мемоизация и какие ограничения есть у кеша функции?                  | Функции       | Новый вопрос                          | `function-memoization`         |
| 65                 | Как выбрасывать и обрабатывать ошибки в JavaScript?                            | Основы языка  | Существующий вопрос; без дублирования | `error-handling`               |

## Объединения и уточнения

- 1 + 15 → «Чем стрелочные функции отличаются от обычных и когда их не стоит использовать?»: выбор формы объяснён через this, arguments, new и генераторы.
- 2 + 3 + 4 → «Чем отличаются Function Declaration и Function Expression?»: способы создания, анонимность, именованное выражение и доступность до объявления.
- 8 + 36 → существующее «Что такое замыкание и когда оно полезно?». Пункт 37 оставлен отдельным: ошибка с var проверяет захват общей привязки, а не только знание определения.
- 9 + 22 + 34 → «От чего зависит this внутри функции?»: единая модель вызовов. Пункт 35 о потере контекста оставлен отдельным практическим вопросом.
- 10 + 13 → «Что такое arguments и есть ли он у стрелочной функции?». Rest-параметры и значения по умолчанию сохранены самостоятельными вопросами.
- 18 + 19 + 20 → «Чем отличаются Function.prototype.call и apply?». Bind оставлен отдельно: он создаёт новую функцию и не выполняет исходную сразу.
- 25 + 26 → «Что такое функция-обёртка и как с её помощью декорировать поведение?». Декоратор уточнён как функциональный приём, без смешивания с синтаксисом декораторов классов.
- 27 + 28 + 29 + 30 + 31 → «Как работают function*, yield и return в генераторе?»: жизненный цикл next/yield/return и запрет yield во вложенной стрелке. Пункты 32 + 33 вынесены отдельно: они проверяют контракт iterator/iterable.
- 42 + 44 + 45 → «Что такое callback и кто определяет его аргументы?». Callback hell и синхронность вызова - отдельные учебные цели.
- 48 + 49 + 50 → «Что такое рекурсия и зачем ей базовый случай?». Применение к деревьям и уменьшение задачи объяснены вместе.
- 52 + 53 → «Как избежать переполнения стека и заменить глубокую рекурсию циклом?». Хвостовая рекурсия оставлена отдельно с оговоркой о поддержке оптимизации.
- 55 + 56 → «Что такое чистая функция и какие действия считаются побочными эффектами?». Отсутствие состояния оставлено отдельным вопросом: stateless не означает pure.
- 59 + 60 + 61 → «Чем каррирование отличается от частичного применения?»: обе формы показаны рядом, без дублирования определений.
- 62 + 63 → «Что такое композиция функций и как реализовать compose?»: определение и реализация с явно ограниченным синхронным одноаргументным контрактом.

## Уже раскрытые темы

- 5 → `hoisting`: Общий механизм уже раскрыт в «Основах языка»; отличие FD и FE дополнительно показано в новом вопросе об объявлениях функций.
- 7 → `value-and-reference`: Существующий вопрос уже объясняет передачу параметров, мутацию объекта и локальное переназначение.
- 14 → `spread`: В существующем вопросе уже показана распаковка массива в аргументы вызова.
- 38 → `scope`: Лексическая, функциональная, блочная и модульная области уже описаны.
- 39 → `variables`: Различия областей var, let и const уже описаны; отдельная ошибка захвата в цикле добавлена в «Функции».
- 41 → `global-variables`: Различие глобальных привязок, globalThis и верхнего уровня ES-модуля уже раскрыто.
- 47 → `event-loop`: В «Асинхронности» уже есть порядок синхронного кода, микрозадач и setTimeout с нулевой задержкой.
- 58 → `mutability`: Существующий вопрос уже показывает иммутабельное обновление, поверхностное копирование и общие вложенные объекты; чистота функций добавлена отдельно.
- 65 → `error-handling`: Существующий вопрос содержит throw внутри функции, try/catch, finally и отличия синхронных ошибок от отклонения Promise.

Вопросы callback hell и различия синхронных/асинхронных callback оставлены в «Функциях» по запрошенной структуре: они посвящены контракту вызова функции. Развёрнутый event loop остаётся в «Асинхронности».

## Источники для технических нюансов

- [MDN: объявления функций](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function).
- [MDN: выражения функций](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function).
- [MDN: стрелочные функции](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).
- [MDN: this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this).
- [MDN: arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments).
- [MDN: rest-параметры](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
- [MDN: параметры по умолчанию](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters).
- [MDN: IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE).
- [MDN: конструктор Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function).
- [MDN: call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).
- [MDN: apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply).
- [MDN: bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
- [MDN: Function.prototype.toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/toString).
- [MDN: function*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).
- [MDN: yield](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield).
- [MDN: протоколы итерации](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).
- [MDN: замыкания и циклы](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures).
- [MDN: строгий режим](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode).
- [MDN: callback](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function).
- [MDN: setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout).
- [MDN: Promise и цепочки асинхронных действий](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).
- [MDN: рекурсия](https://developer.mozilla.org/en-US/docs/Glossary/Recursion).
- [MDN: переполнение стека](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Too_much_recursion).
- [MDN: хвостовые вызовы и ограничения реализации](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model#tail_calls).
- [MDN: функции как значения](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function).
- [React: чистота функций и побочные эффекты](https://react.dev/learn/keeping-components-pure).
- [MDN: reduceRight](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight).
- [MDN: Map и сравнение ключей кеша](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).

## Применение

Из корня проекта выполнить `pnpm db:seed`. Seed обновляет каталог по стабильным ID; существующие отметки и избранное сохраняются. База при подготовке файлов не изменялась. Сервер, Docker, seed, миграции, сборка и проверки не запускались; код примеров также не выполнялся.
