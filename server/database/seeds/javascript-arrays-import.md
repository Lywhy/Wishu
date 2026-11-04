# JavaScript - Массивы и структуры данных: разбор списка

52 исходных пункта покрываются 28 самостоятельными вопросами. В новый подраздел arrays добавлены 22 вопроса с ответами, примерами, описанием, выводом и сложностью. Ещё 6 вопросов переиспользованы без дублирования: 4 из «Основ языка», 1 из «Функций» и 1 из «Объектов и прототипов».

Подраздел расположен после «Объектов и прототипов», перед «Асинхронностью». У «Асинхронности» меняется только порядок карточки; существующие ID, содержание, связи вопросов, отметки и избранное сохраняются. Объединений разных сохранённых ID нет; перенос прогресса и SQL-миграция не нужны.

## Соответствие исходных пунктов

Номера соответствуют входному списку. Несколько номеров в строке означают объединение в одну учебную цель.

| Пункты             | Итоговый вопрос                                                               | Подраздел                  | Результат                             | ID                    |
| ------------------ | ----------------------------------------------------------------------------- | -------------------------- | ------------------------------------- | --------------------- |
| 1                  | Как работает map и что возвращает его callback?                               | Массивы и структуры данных | Новый вопрос                          | `array-map`           |
| 2, 4               | Чем filter отличается от find?                                                | Массивы и структуры данных | Новый вопрос                          | `array-filter-find`   |
| 3                  | Когда использовать forEach и какие у него ограничения?                        | Массивы и структуры данных | Новый вопрос                          | `array-for-each`      |
| 5                  | Как работает reduce и зачем задавать начальное значение?                      | Массивы и структуры данных | Новый вопрос                          | `array-reduce`        |
| 6, 7               | Чем some отличается от every и что они возвращают для пустого массива?        | Массивы и структуры данных | Новый вопрос                          | `array-some-every`    |
| 8, 30, 40          | Как сортировать числа и чем sort отличается от toSorted?                      | Массивы и структуры данных | Новый вопрос                          | `array-sort`          |
| 9                  | Чем flatMap отличается от map?                                                | Массивы и структуры данных | Новый вопрос                          | `array-flat-map`      |
| 10                 | Чем массив отличается от обычного объекта?                                    | Объекты и прототипы        | Существующий вопрос; без дублирования | `object-vs-array`     |
| 11, 12, 15, 19, 21 | Как читать элементы массива по индексу и получить последний элемент?          | Массивы и структуры данных | Новый вопрос                          | `array-indexing`      |
| 13, 14             | Как надёжно проверить, что значение является массивом?                        | Основы языка               | Существующий вопрос; без дублирования | `array-detection`     |
| 16, 20             | Как length связан с плотным и разрежённым массивом?                           | Массивы и структуры данных | Новый вопрос                          | `array-length-holes`  |
| 17, 18             | Что делает оператор delete?                                                   | Основы языка               | Существующий вопрос; без дублирования | `delete-operator`     |
| 22, 23, 24, 25, 26 | Как push, pop, shift и unshift меняют массив и чем push отличается от concat? | Массивы и структуры данных | Новый вопрос                          | `array-end-methods`   |
| 27, 28, 41         | Чем отличаются slice, splice и toSpliced?                                     | Массивы и структуры данных | Новый вопрос                          | `array-slice-splice`  |
| 29, 39             | Чем reverse отличается от toReversed?                                         | Массивы и структуры данных | Новый вопрос                          | `array-reverse`       |
| 31, 32             | Как join и split преобразуют массив и строку?                                 | Массивы и структуры данных | Новый вопрос                          | `array-join-split`    |
| 33, 43             | Как работает spread и насколько глубоко он копирует данные?                   | Основы языка               | Существующий вопрос; без дублирования | `spread`              |
| 34, 36             | Что такое псевдомассив и как Array.from превращает его в массив?              | Массивы и структуры данных | Новый вопрос                          | `array-from`          |
| 35                 | Чем Array.of отличается от Array при создании массива?                        | Массивы и структуры данных | Новый вопрос                          | `array-of`            |
| 37                 | Что такое arguments и есть ли он у стрелочной функции?                        | Функции                    | Существующий вопрос; без дублирования | `function-arguments`  |
| 38                 | Что делает copyWithin и меняет ли он длину массива?                           | Массивы и структуры данных | Новый вопрос                          | `array-copy-within`   |
| 42                 | Чем отличаются for...in и for...of?                                           | Основы языка               | Существующий вопрос; без дублирования | `for-in-for-of`       |
| 44                 | Как пропускать элементы при деструктуризации массива?                         | Массивы и структуры данных | Новый вопрос                          | `array-destructuring` |
| 45, 46             | Как создать и обойти двумерный массив без общих строк?                        | Массивы и структуры данных | Новый вопрос                          | `array-matrices`      |
| 47                 | Как получить плоский массив из вложенного через flat?                         | Массивы и структуры данных | Новый вопрос                          | `array-flat`          |
| 48                 | Что такое Set и как он определяет уникальность значений?                      | Массивы и структуры данных | Новый вопрос                          | `set-collection`      |
| 49, 52             | Чем WeakMap и WeakSet отличаются от Map и Set?                                | Массивы и структуры данных | Новый вопрос                          | `weak-collections`    |
| 50, 51             | Что такое Map и когда он удобнее обычного объекта?                            | Массивы и структуры данных | Новый вопрос                          | `map-vs-object`       |

## Объединения и уточнения

- 2 + 4 → «Чем filter отличается от find?»: поиск всех совпадений и первого совпадения разобран рядом.
- 6 + 7 → «Чем some отличается от every и что они возвращают для пустого массива?»: общая задача логической проверки и разное короткое замыкание.
- 8 + 30 + 40 → «Как сортировать числа и чем sort отличается от toSorted?»: компаратор, сортировка по умолчанию и версия без мутации.
- 11 + 12 + 15 + 19 + 21 → «Как читать элементы массива по индексу и получить последний элемент?»: широкое «Как работать с массивом» уточнено до базового индексного доступа, включая смешанные типы, отсутствие элемента и at(-1).
- 13 + 14 → существующее «Как надёжно проверить, что значение является массивом?».
- 16 + 20 → «Как length связан с плотным и разрежённым массивом?»: границы массива, пропуски и ручное усечение.
- 17 + 18 → существующее «Что делает оператор delete?»: удаление свойства не сдвигает элементы и не уменьшает длину.
- 22 + 23 + 24 + 25 + 26 → «Как push, pop, shift и unshift меняют массив и чем push отличается от concat?»: единая модель операций на концах, возвращаемые значения и выбор мутации.
- 27 + 28 + 41 → «Чем отличаются slice, splice и toSpliced?»: получение диапазона, изменение оригинала и новый результат редактирования.
- 29 + 39 → «Чем reverse отличается от toReversed?».
- 31 + 32 → «Как join и split преобразуют массив и строку?»: split уточнён как метод строки, а не массива.
- 33 + 43 → существующее «Как работает spread и насколько глубоко он копирует данные?».
- 34 + 36 → «Что такое псевдомассив и как Array.from превращает его в массив?». Пункт 37 сохраняет существующий пример Array.from(arguments) в «Функциях».
- 45 + 46 → «Как создать и обойти двумерный массив без общих строк?»: создание и обход одной структуры, включая ошибку fill([]).
- 49 + 52 → «Чем WeakMap и WeakSet отличаются от Map и Set?»: общий принцип слабых связей с разницей ключей и элементов.
- 50 + 51 → «Что такое Map и когда он удобнее обычного объекта?». Здесь Map - коллекция, а не метод массива map.

Map, forEach, reduce, flatMap, flat, Set, copyWithin, деструктуризация и Array.of оставлены отдельными: у них разные контракты и учебные цели. FlatMap раскрывает результаты преобразования на один уровень, flat работает с уже вложенной структурой и заданной глубиной.

## Существующие вопросы и расположение

- 10 → `object-vs-array`: Массив как специальный объект, его length и отличия от обычной записи уже раскрыты в «Объектах и прототипах».
- 13, 14 → `array-detection`: Существующий вопрос уже объясняет typeof [] и Array.isArray, включая ограничения instanceof.
- 17, 18 → `delete-operator`: Уже раскрыты удаление индексного свойства без изменения length и отличие от удаления со сдвигом через splice; в новом сравнении slice/splice/toSpliced дополнительно разобран контракт splice.
- 33, 43 → `spread`: Spread и поверхностное копирование уже объяснены. Дополнительно новый вопрос slice/splice/toSpliced показывает slice как способ копирования диапазона, включая slice() всего массива.
- 37 → `function-arguments`: В существующем вопросе уже есть Array.from(arguments) с примером. Общий случай array-like и iterable теперь раскрыт отдельно.
- 42 → `for-in-for-of`: Существующий вопрос уже сравнивает ключи for...in и значения for...of на массиве.

## Источники технических нюансов

- [MDN: доступ с отрицательным смещением](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at).
- [MDN: length и пропуски](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length).
- [MDN: push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push).
- [MDN: pop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop).
- [MDN: shift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift).
- [MDN: unshift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift).
- [MDN: concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat).
- [MDN: slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice).
- [MDN: splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice).
- [MDN: toSpliced](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced).
- [MDN: reverse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse).
- [MDN: toReversed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed).
- [MDN: sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).
- [MDN: toSorted](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted).
- [MDN: join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join).
- [MDN: map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).
- [MDN: filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).
- [MDN: find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find).
- [MDN: forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).
- [MDN: reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).
- [MDN: some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some).
- [MDN: every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every).
- [MDN: flatMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap).
- [MDN: flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat).
- [MDN: Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from).
- [MDN: Array.of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of).
- [MDN: copyWithin](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin).
- [MDN: fill и общие ссылки](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill).
- [MDN: String.split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split).
- [MDN: деструктуризация](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring).
- [MDN: Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set).
- [MDN: Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).
- [MDN: WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet).
- [MDN: WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap).

Слабые коллекции описаны с учётом допустимых незарегистрированных Symbol. Сборка мусора не представлена как немедленная или управляемая операция. Примеры не требуют её запуска.

## Применение

Из корня проекта выполнить `pnpm db:seed`. Seed добавит подраздел и вопросы по стабильным ID. Существующие отметки и избранное сохраняются. База при подготовке контента не изменялась. Сервер, Docker, seed, миграции, сборка и проверки не запускались; примеры не выполнялись.
