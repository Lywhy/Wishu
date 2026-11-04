# JavaScript - Объекты и прототипы: разбор списка

46 исходных пунктов покрываются 25 самостоятельными вопросами. Добавлено 17 новых вопросов с ответами, примерами, кратким описанием, выводом и сложностью. Существующий вопрос prototype-chain уточнён с сохранением ID; в подразделе теперь 18 вопросов. Ещё 7 существующих вопросов используются без дублирования: 6 из «Основ языка» и 1 из «Функций». Строка «153 ms» принята за случайный фрагмент, а не тему вопроса.

Существующие ID и расположение вопросов сохранены. У prototype-chain обновлены заголовок, ответ, пример, вывод и порядок внутри подраздела. Другие существующие вопросы не изменялись. Объединения касаются входных формулировок, а не разных сохранённых ID; перенос отметок и избранного не требуется.

## Соответствие исходных пунктов

Номера относятся к входному списку. Несколько номеров в строке означают объединение.

| Пункты         | Итоговый вопрос                                                               | Подраздел           | Результат                                | ID                          |
| -------------- | ----------------------------------------------------------------------------- | ------------------- | ---------------------------------------- | --------------------------- |
| 1, 4           | Как устроен объект JavaScript и что означает пара «ключ - значение»?          | Объекты и прототипы | Новый вопрос                             | `object-properties`         |
| 2              | Как создать объект и что делает оператор new?                                 | Основы языка        | Существующий вопрос; без дублирования    | `object-creation-new`       |
| 3              | Чем массив отличается от обычного объекта?                                    | Объекты и прототипы | Новый вопрос                             | `object-vs-array`           |
| 5, 18, 22      | Как читать, добавлять свойства и методы через точку и квадратные скобки?      | Объекты и прототипы | Новый вопрос                             | `object-property-access`    |
| 6              | Что делает оператор delete?                                                   | Основы языка        | Существующий вопрос; без дублирования    | `delete-operator`           |
| 7, 19          | Как проверить наличие свойства и что возвращает отсутствующее свойство?       | Основы языка        | Существующий вопрос; без дублирования    | `property-presence`         |
| 8, 9, 10       | Чем отличаются Object.keys, Object.values и Object.entries?                   | Объекты и прототипы | Новый вопрос                             | `object-enumeration`        |
| 11, 12         | Чем поверхностная копия объекта отличается от глубокой?                       | Объекты и прототипы | Новый вопрос                             | `object-copy-depth`         |
| 13, 16         | Как сделать глубокую копию через structuredClone и какие у неё ограничения?   | Объекты и прототипы | Новый вопрос                             | `structured-clone`          |
| 14             | Как передаются примитивы и объекты: по значению или по ссылке?                | Основы языка        | Существующий вопрос; без дублирования    | `value-and-reference`       |
| 15, 25         | Что делает Object.assign и чем он отличается от spread?                       | Объекты и прототипы | Новый вопрос                             | `object-assign`             |
| 17, 20         | Как работает объектный литерал и сокращённая запись свойств?                  | Объекты и прототипы | Новый вопрос                             | `object-literals`           |
| 21             | Как работают геттеры и сеттеры объекта?                                       | Объекты и прототипы | Новый вопрос                             | `object-accessors`          |
| 23, 24, 41, 42 | Что такое дескриптор свойства и как defineProperty задаёт его флаги?          | Объекты и прототипы | Новый вопрос                             | `property-descriptors`      |
| 26, 34         | Как Object.create задаёт прототип и зачем создавать объект с null-прототипом? | Объекты и прототипы | Новый вопрос                             | `object-create-prototype`   |
| 27, 28, 29     | Чем отличаются Object.preventExtensions, seal и freeze?                       | Объекты и прототипы | Новый вопрос                             | `object-integrity`          |
| 30, 31, 35     | Что такое прототип и как работает цепочка прототипов?                         | Объекты и прототипы | Уточнён существующий вопрос; ID сохранён | `prototype-chain`           |
| 32, 33         | Чем отличаются [[Prototype]], `__proto__` и свойство prototype конструктора?  | Объекты и прототипы | Новый вопрос                             | `prototype-vs-proto`        |
| 36             | Как работает instanceof и какие у него ограничения?                           | Основы языка        | Существующий вопрос; без дублирования    | `instanceof-operator`       |
| 37             | От чего зависит this внутри функции?                                          | Функции             | Существующий вопрос; без дублирования    | `function-this`             |
| 38             | Что возвращает toString у объекта и как его переопределить?                   | Объекты и прототипы | Новый вопрос                             | `object-to-string`          |
| 39             | Что такое JSON и как работают JSON.parse и JSON.stringify?                    | Основы языка        | Существующий вопрос; без дублирования    | `json-format`               |
| 40             | Как toJSON меняет результат JSON.stringify?                                   | Объекты и прототипы | Новый вопрос                             | `object-to-json`            |
| 43, 44         | Чем Reflect отличается от Object и что возвращает Reflect.defineProperty?     | Объекты и прототипы | Новый вопрос                             | `reflect-object-operations` |
| 45, 46         | Как Proxy перехватывает операции и что такое ловушки?                         | Объекты и прототипы | Новый вопрос                             | `proxy-traps`               |

## Решения по объединению

- 1 + 4 → «Как устроен объект JavaScript и что означает пара „ключ - значение“?»: типы ключей, значения, собственные свойства и идентичность.
- 5 + 18 + 22 → «Как читать, добавлять свойства и методы через точку и квадратные скобки?»: доступ и изменение после создания объекта.
- 7 + 19 → существующий вопрос «Как проверить наличие свойства и что возвращает отсутствующее свойство?».
- 8 + 9 + 10 → «Чем отличаются Object.keys, Object.values и Object.entries?»: одна выборка свойств с разной формой результата.
- 11 + 12 → «Чем поверхностная копия объекта отличается от глубокой?». Пункты 13 + 16 раскрывают конкретный инструмент отдельно: «Как сделать глубокую копию через structuredClone и какие у неё ограничения?».
- 15 + 25 → «Что делает Object.assign и чем он отличается от spread?»: повтор одного метода сведён в один вопрос, сохранены мутация цели и отличие от создания свойств через spread.
- 17 + 20 → «Как работает объектный литерал и сокращённая запись свойств?»: shorthand не создаёт живую связь с переменной.
- 23 + 24 + 41 + 42 → «Что такое дескриптор свойства и как defineProperty задаёт его флаги?»: readonly уточнён как поведение времени выполнения; отдельно указано отличие TypeScript readonly.
- 26 + 34 → «Как Object.create задаёт прототип и зачем создавать объект с null-прототипом?»: выражение «без prototype» уточнено до внутреннего прототипа null.
- 27 + 28 + 29 → «Чем отличаются Object.preventExtensions, seal и freeze?»: уровни ограничений рассмотрены совместно с оговоркой о поверхностности.
- 30 + 31 + 35 → уточнён существующий prototype-chain: «Что такое прототип и как работает цепочка прототипов?».
- 32 + 33 → «Чем отличаются [[Prototype]], `__proto__` и свойство prototype конструктора?»: внутренняя связь не смешивается с accessor и свойством конструктора.
- 43 + 44 → «Чем Reflect отличается от Object и что возвращает Reflect.defineProperty?»: булев результат обычного отказа не представлен как подавление всех исключений.
- 45 + 46 → «Как Proxy перехватывает операции и что такое ловушки?»: get/set показаны вместе с делегированием через Reflect и обязательными инвариантами.

## Уже раскрытые темы и расположение

- 2 → `object-creation-new`: Литерал, Object.create, new и классы уже сопоставлены в «Основах языка». Новые вопросы этого подраздела отдельно углубляют синтаксис литерала и заданный прототип.
- 6 → `delete-operator`: Удаление собственного свойства, configurable, строгий режим и особенности массивов уже раскрыты.
- 7, 19 → `property-presence`: Проверка через in и Object.hasOwn уже сопоставлена с чтением отсутствующего свойства и значением undefined.
- 14 → `value-and-reference`: Существующий вопрос объясняет общую ссылку на объект; новый вопрос о глубине копии дополнительно противопоставляет присваивание созданию копии.
- 36 → `instanceof-operator`: Проверка цепочки Constructor.prototype и ограничения instanceof уже описаны.
- 37 → `function-this`: В «Функциях» уже объяснены this при obj.method(), отдельном вызове и явной привязке.
- 39 → `json-format`: JSON.stringify, JSON.parse и потери при сериализации уже описаны. Пользовательский протокол toJSON добавлен отдельным вопросом.

Общие способы создания объекта, delete, наличие свойства, instanceof и this остаются в прежних подразделах для сохранения согласованной структуры без повторяющихся карточек. Новые вопросы о дескрипторах, копировании и протоколах углубляют отдельные навыки, а не повторяют вводные определения.

## Источники технических нюансов

- [MDN: работа с объектами](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects).
- [MDN: объектный литерал](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer).
- [MDN: массивы](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).
- [MDN: Object.keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys).
- [MDN: Object.entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries).
- [MDN: Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).
- [MDN: structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone).
- [MDN: алгоритм структурированного клонирования](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm).
- [MDN: get](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get).
- [MDN: set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set).
- [MDN: Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).
- [MDN: Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).
- [MDN: Object.preventExtensions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions).
- [MDN: Object.seal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal).
- [MDN: Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze).
- [MDN: устаревший accessor прототипа](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto).
- [MDN: Object.prototype.toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString).
- [MDN: JSON.stringify и toJSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).
- [MDN: Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect).
- [MDN: Reflect.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/defineProperty).
- [MDN: Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).
- [MDN: инварианты ловушки get](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get).

## Применение

Из корня проекта выполнить `pnpm db:seed`. Наполнение обновляет записи по стабильным ID и сохраняет отметки и избранное. База при подготовке файлов не изменялась. Сервер, Docker, seed, миграции, сборка и проверки не запускались; примеры кода не выполнялись.
