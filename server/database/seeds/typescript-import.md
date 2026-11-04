# TypeScript: разбор списка разделов и вопросов

Обработаны 114 исходных пунктов из 12 подразделов: в таблицы включены 114 уникальных входных номеров. Всего самостоятельных вопросов каталога: 61. Добавлено 58 новых вопросов с ответами, примерами, описанием, выводом и сложностью. Уточнены 2 существующих вопроса; 1 существующий вопрос JavaScript переиспользован без дублирования.

В TypeScript теперь 12 подразделов: добавлено 10, два прежних переименованы и упорядочены с сохранением ID. Вопросы unknown-any и generics остаются по прежним адресам. При уточнении порядка unknown-any перемещён внутри того же подраздела после базовых типов и литералов. Существующие вопросы JavaScript не изменялись.

Удалений или объединения разных сохранённых ID нет. Отметки и избранное остаются связанными с прежними ID. Для добавления содержимого не требуются новые SQL-миграции. Конфигурация TypeScript, API и интерфейс не менялись.

## Содержание по подразделам

| Подраздел                            | Вопросов | ID подраздела       |
| ------------------------------------ | -------- | ------------------- |
| Основы TypeScript                    | 5        | `ts-fundamentals`   |
| Базовые и специальные типы           | 7        | `types`             |
| Объектные типы и интерфейсы          | 6        | `ts-objects`        |
| Массивы, кортежи и коллекции         | 4        | `ts-collections`    |
| Типизация функций                    | 4        | `ts-functions`      |
| Union и Intersection Types           | 2        | `ts-unions`         |
| Сужение типов и Type Guards          | 4        | `ts-narrowing`      |
| Дженерики                            | 5        | `generics`          |
| Операторы типов и преобразования     | 6        | `ts-type-operators` |
| Utility Types                        | 6        | `ts-utility-types`  |
| Типизация классов и ООП              | 6        | `ts-classes`        |
| Практики, ограничения и антипаттерны | 5        | `ts-practices`      |

## Основные объединения

- Основы 1, 2, 7 → TypeScript, статическая проверка и удаление типов. Пункты 4–6 → гарантии и ограничения. Пункты 3 и Практики 4 → один вопрос о strict.
- Основы 10 и Объектные типы 12 → структурная совместимость. Type/interface и способы описания объектов из пунктов 1–4 объектного списка объединены в одно сравнение.
- Базовые типы 6–7 и Практики 1 → дополнен unknown-any. Базовые типы 8 и Функции 5 → void; Базовые типы 9, Функции 6 и Union/Intersection 9 → never и модель множества значений.
- Базовые типы 10 и Практики 6 → enum, компромиссы и альтернативы.
- Объектные типы 5–6 → optional/readonly; 8–9 → несколько extends; 10 и Intersection 4, 6–8 → составные контракты и конфликты. Повторное объявление interface оставлено отдельно от extends.
- Объектные типы 13 и Операторы 12 → рекурсивные типы и generic-дерево; тема размещена в «Объектных типах и интерфейсах».
- Массивы 1, 2, 4 → типы элементов и вложенность. Readonly-массив и кортеж оставлены отдельно, Set/Map объединены по задаче типизации коллекций.
- Функции 1, 2, 8 → сигнатура, результат и type/interface; 3–4 → optional/default/rest. Async и перегрузки - отдельные контракты.
- Union 1–3, 5 → альтернативы и допустимые операции; Intersection 4, 6–8 → совместные требования, конфликты и модификаторы.
- Narrowing 1–4 → поток управления и встроенные проверки; 7–8 → discriminated union и полнота через never. Предикат value is T и assertion function asserts оставлены отдельно: у них разные контракты вызова.
- Дженерики 1–4 → дополнен существующий generics; 6 и 10 → generic-контейнеры и вложенность; 7–8 и Практики 5 → необходимость extends. Несколько параметров и default оставлены отдельно.
- Операторы 1, 3, 4 → keyof, T[K] и зависимый ключ; 5–6 → mapped types и модификаторы; 8–9 → infer; 10–11 → дистрибутивность и корректная проверка never. Обычный conditional type раскрыт отдельно.
- Utility Types: 1–2 → модификаторы; 5–6 → отбор union; 7–8 → извлечение вызываемых/конструкторных сигнатур. Выбор свойств, Record и строковые helpers оставлены отдельными.
- Классы 1–2 → типы членов и инициализация; 7–8 → implements/extends. Пункт 5 о static ссылается на уже существующую карточку JavaScript; аннотация static-поля также показана в ts-class-members.

## Полное соответствие исходным пунктам

Номера относятся к входному списку внутри указанного заголовка. Несколько номеров в строке объединены в один вопрос.

### Основы TypeScript - 10 пунктов

| Пункты  | Итоговый вопрос                                                                         | Размещение                                        | Решение | ID                     |
| ------- | --------------------------------------------------------------------------------------- | ------------------------------------------------- | ------- | ---------------------- |
| 1, 2, 7 | Как TypeScript проверяет JavaScript-код и что происходит с типами после преобразования? | TypeScript → Основы TypeScript                    | Новый   | `ts-language`          |
| 3       | Чем strict в TypeScript отличается от выражения «строгая типизация»?                    | TypeScript → Практики, ограничения и антипаттерны | Новый   | `ts-strict-mode`       |
| 4, 5, 6 | Какие гарантии даёт TypeScript и какие ошибки остаются во время выполнения?             | TypeScript → Основы TypeScript                    | Новый   | `ts-safety-limits`     |
| 8       | Что задаёт tsconfig.json и чем target отличается от lib?                                | TypeScript → Основы TypeScript                    | Новый   | `ts-config`            |
| 9       | Как работает вывод типов и когда полезна явная аннотация?                               | TypeScript → Основы TypeScript                    | Новый   | `ts-inference`         |
| 10      | Как структурная типизация определяет совместимость и чем отличается от номинальной?     | TypeScript → Основы TypeScript                    | Новый   | `ts-structural-typing` |

### Базовые и специальные типы - 10 пунктов

| Пункты  | Итоговый вопрос                                                                       | Размещение                              | Решение               | ID                   |
| ------- | ------------------------------------------------------------------------------------- | --------------------------------------- | --------------------- | -------------------- |
| 1, 2, 3 | Какие примитивные типы описывает TypeScript и почему используют string вместо String? | TypeScript → Базовые и специальные типы | Новый                 | `ts-primitive-types` |
| 4       | Как strictNullChecks меняет работу с null и undefined?                                | TypeScript → Базовые и специальные типы | Новый                 | `ts-nullability`     |
| 5       | Что такое литеральный тип и как сохранить точное значение через as const?             | TypeScript → Базовые и специальные типы | Новый                 | `ts-literal-types`   |
| 6, 7    | Когда использовать unknown вместо any и чем опасно необоснованное any?                | TypeScript → Базовые и специальные типы | Дополнен, ID сохранён | `unknown-any`        |
| 8       | Что означает void в результате функции и почему callback может вернуть значение?      | TypeScript → Базовые и специальные типы | Новый                 | `ts-void`            |
| 9       | Что означает never и чем он отличается от void?                                       | TypeScript → Базовые и специальные типы | Новый                 | `ts-never`           |
| 10      | Для чего нужен enum и какие есть альтернативы?                                        | TypeScript → Базовые и специальные типы | Новый                 | `ts-enums`           |

### Объектные типы и интерфейсы - 13 пунктов

| Пункты     | Итоговый вопрос                                                                      | Размещение                               | Решение | ID                      |
| ---------- | ------------------------------------------------------------------------------------ | ---------------------------------------- | ------- | ----------------------- |
| 1, 2, 3, 4 | Чем type отличается от interface и как ими описывать объекты?                        | TypeScript → Объектные типы и интерфейсы | Новый   | `ts-type-interface`     |
| 5, 6       | Как optional и readonly меняют контракт свойства?                                    | TypeScript → Объектные типы и интерфейсы | Новый   | `ts-property-modifiers` |
| 7          | Как index signature описывает динамические ключи объекта?                            | TypeScript → Объектные типы и интерфейсы | Новый   | `ts-index-signature`    |
| 8, 9       | Как interface расширяет один или несколько объектных контрактов?                     | TypeScript → Объектные типы и интерфейсы | Новый   | `ts-interface-extends`  |
| 10         | Как intersection объединяет требования и что происходит с конфликтующими свойствами? | TypeScript → Union и Intersection Types  | Новый   | `ts-intersection-types` |
| 11         | Что происходит при повторном объявлении interface с одним именем?                    | TypeScript → Объектные типы и интерфейсы | Новый   | `ts-interface-merging`  |
| 12         | Как структурная типизация определяет совместимость и чем отличается от номинальной?  | TypeScript → Основы TypeScript           | Новый   | `ts-structural-typing`  |
| 13         | Как описывать рекурсивные типы и рекурсивные generic-структуры?                      | TypeScript → Объектные типы и интерфейсы | Новый   | `ts-recursive-types`    |

### Массивы, кортежи и коллекции - 7 пунктов

| Пункты  | Итоговый вопрос                                                        | Размещение                                | Решение | ID                   |
| ------- | ---------------------------------------------------------------------- | ----------------------------------------- | ------- | -------------------- |
| 1, 2, 4 | Как типизировать обычный, смешанный и двумерный массив?                | TypeScript → Массивы, кортежи и коллекции | Новый   | `ts-array-types`     |
| 3       | Чем readonly T[] и ReadonlyArray<T> отличаются от изменяемого массива? | TypeScript → Массивы, кортежи и коллекции | Новый   | `ts-readonly-arrays` |
| 5       | Что такое кортеж и чем он отличается от массива?                       | TypeScript → Массивы, кортежи и коллекции | Новый   | `ts-tuples`          |
| 6, 7    | Как типизировать Set и Map и почему важен тип ключа?                   | TypeScript → Массивы, кортежи и коллекции | Новый   | `ts-set-map`         |

### Типизация функций - 9 пунктов

| Пункты  | Итоговый вопрос                                                                  | Размещение                              | Решение | ID                       |
| ------- | -------------------------------------------------------------------------------- | --------------------------------------- | ------- | ------------------------ |
| 1, 2, 8 | Как описать тип функции через сигнатуру, type или interface?                     | TypeScript → Типизация функций          | Новый   | `ts-function-signatures` |
| 3, 4    | Как типизировать optional, default и rest-параметры?                             | TypeScript → Типизация функций          | Новый   | `ts-function-parameters` |
| 5       | Что означает void в результате функции и почему callback может вернуть значение? | TypeScript → Базовые и специальные типы | Новый   | `ts-void`                |
| 6       | Что означает never и чем он отличается от void?                                  | TypeScript → Базовые и специальные типы | Новый   | `ts-never`               |
| 7       | Как типизировать async-функцию и результат её ожидания?                          | TypeScript → Типизация функций          | Новый   | `ts-async-functions`     |
| 9       | Как объявлять перегрузки функции и какую роль играет реализация?                 | TypeScript → Типизация функций          | Новый   | `ts-function-overloads`  |

### Union и Intersection Types - 9 пунктов

| Пункты     | Итоговый вопрос                                                                      | Размещение                              | Решение | ID                      |
| ---------- | ------------------------------------------------------------------------------------ | --------------------------------------- | ------- | ----------------------- |
| 1, 2, 3, 5 | Что означает union и какие операции доступны до сужения?                             | TypeScript → Union и Intersection Types | Новый   | `ts-union-types`        |
| 4, 6, 7, 8 | Как intersection объединяет требования и что происходит с конфликтующими свойствами? | TypeScript → Union и Intersection Types | Новый   | `ts-intersection-types` |
| 9          | Что означает never и чем он отличается от void?                                      | TypeScript → Базовые и специальные типы | Новый   | `ts-never`              |

### Сужение типов и Type Guards - 8 пунктов

| Пункты     | Итоговый вопрос                                                         | Размещение                               | Решение | ID                          |
| ---------- | ----------------------------------------------------------------------- | ---------------------------------------- | ------- | --------------------------- |
| 1, 2, 3, 4 | Как TypeScript сужает тип через проверки и поток управления?            | TypeScript → Сужение типов и Type Guards | Новый   | `ts-control-flow-narrowing` |
| 5          | Как написать type guard с предикатом value is T?                        | TypeScript → Сужение типов и Type Guards | Новый   | `ts-type-predicates`        |
| 6          | Что означает asserts value is T в assertion function?                   | TypeScript → Сужение типов и Type Guards | Новый   | `ts-assertion-functions`    |
| 7, 8       | Как discriminated union помогает проверить полноту обработки вариантов? | TypeScript → Сужение типов и Type Guards | Новый   | `ts-discriminated-unions`   |

### Дженерики - 10 пунктов

| Пункты     | Итоговый вопрос                                                               | Размещение             | Решение               | ID                       |
| ---------- | ----------------------------------------------------------------------------- | ---------------------- | --------------------- | ------------------------ |
| 1, 2, 3, 4 | Как generics сохраняют связь типов и как выводятся параметры generic-функции? | TypeScript → Дженерики | Дополнен, ID сохранён | `generics`               |
| 5          | Когда функции нужны несколько параметров типа?                                | TypeScript → Дженерики | Новый                 | `ts-multiple-generics`   |
| 6, 10      | Как объявлять generic-типы и читать вложенные обобщения?                      | TypeScript → Дженерики | Новый                 | `ts-generic-containers`  |
| 7, 8       | Когда generic-параметру нужно extends и когда ограничение избыточно?          | TypeScript → Дженерики | Новый                 | `ts-generic-constraints` |
| 9          | Как задавать значение по умолчанию параметру типа?                            | TypeScript → Дженерики | Новый                 | `ts-generic-defaults`    |

### Операторы типов и продвинутые преобразования - 12 пунктов

| Пункты  | Итоговый вопрос                                                         | Размещение                                    | Решение | ID                        |
| ------- | ----------------------------------------------------------------------- | --------------------------------------------- | ------- | ------------------------- |
| 1, 3, 4 | Как keyof, T[K] и K extends keyof T типизируют доступ к свойству?       | TypeScript → Операторы типов и преобразования | Новый   | `ts-keyof-indexed-access` |
| 2       | Чем typeof в позиции типа отличается от JavaScript-оператора typeof?    | TypeScript → Операторы типов и преобразования | Новый   | `ts-type-query`           |
| 5, 6    | Как mapped types преобразуют свойства и их модификаторы?                | TypeScript → Операторы типов и преобразования | Новый   | `ts-mapped-types`         |
| 7       | Как работает conditional type T extends U ? X : Y?                      | TypeScript → Операторы типов и преобразования | Новый   | `ts-conditional-types`    |
| 8, 9    | Как infer извлекает части типа, например параметры и результат функции? | TypeScript → Операторы типов и преобразования | Новый   | `ts-infer`                |
| 10, 11  | Как отключить дистрибутивность conditional types и проверить never?     | TypeScript → Операторы типов и преобразования | Новый   | `ts-distributive-never`   |
| 12      | Как описывать рекурсивные типы и рекурсивные generic-структуры?         | TypeScript → Объектные типы и интерфейсы      | Новый   | `ts-recursive-types`      |

### Utility Types - 9 пунктов

| Пункты | Итоговый вопрос                                                                 | Размещение                 | Решение | ID                       |
| ------ | ------------------------------------------------------------------------------- | -------------------------- | ------- | ------------------------ |
| 1, 2   | Зачем нужны utility types и что меняют Partial, Required и Readonly?            | TypeScript → Utility Types | Новый   | `ts-object-utilities`    |
| 3      | Чем Pick отличается от Omit и удаляют ли они реальные свойства?                 | TypeScript → Utility Types | Новый   | `ts-pick-omit`           |
| 4      | Как Record задаёт словарь и чем конечные ключи отличаются от string?            | TypeScript → Utility Types | Новый   | `ts-record`              |
| 5, 6   | Как Exclude, Extract и NonNullable преобразуют union?                           | TypeScript → Utility Types | Новый   | `ts-union-utilities`     |
| 7, 8   | Как извлечь параметры и результат функции либо конструктора?                    | TypeScript → Utility Types | Новый   | `ts-signature-utilities` |
| 9      | Как Uppercase, Lowercase, Capitalize и Uncapitalize преобразуют строковые типы? | TypeScript → Utility Types | Новый   | `ts-string-utilities`    |

### Типизация классов и ООП - 9 пунктов

| Пункты | Итоговый вопрос                                                               | Размещение                           | Решение      | ID                         |
| ------ | ----------------------------------------------------------------------------- | ------------------------------------ | ------------ | -------------------------- |
| 1, 2   | Что TypeScript добавляет к типизации полей, методов и конструктора класса?    | TypeScript → Типизация классов и ООП | Новый        | `ts-class-members`         |
| 3      | Как объявить перегрузки конструктора, если runtime-конструктор один?          | TypeScript → Типизация классов и ООП | Новый        | `ts-constructor-overloads` |
| 4      | Как public, private и protected отличаются от JavaScript-приватности через #? | TypeScript → Типизация классов и ООП | Новый        | `ts-class-visibility`      |
| 5      | Где находятся static-поля и как вызывать статический метод?                   | JavaScript → Классы                  | Существующий | `class-static`             |
| 6      | Для чего нужен abstract class и чем он отличается от интерфейса?              | TypeScript → Типизация классов и ООП | Новый        | `ts-abstract-classes`      |
| 7, 8   | Чем implements отличается от extends?                                         | TypeScript → Типизация классов и ООП | Новый        | `ts-implements-extends`    |
| 9      | Как generic-класс связывает тип полей и методов экземпляра?                   | TypeScript → Типизация классов и ООП | Новый        | `ts-generic-classes`       |

### Практики, ограничения и антипаттерны - 8 пунктов

| Пункты | Итоговый вопрос                                                             | Размещение                                        | Решение               | ID                         |
| ------ | --------------------------------------------------------------------------- | ------------------------------------------------- | --------------------- | -------------------------- |
| 1      | Когда использовать unknown вместо any и чем опасно необоснованное any?      | TypeScript → Базовые и специальные типы           | Дополнен, ID сохранён | `unknown-any`              |
| 2      | Что делает type assertion через as и чего он не проверяет?                  | TypeScript → Практики, ограничения и антипаттерны | Новый                 | `ts-type-assertions`       |
| 3      | Чем @ts-ignore отличается от @ts-expect-error?                              | TypeScript → Практики, ограничения и антипаттерны | Новый                 | `ts-diagnostic-directives` |
| 4      | Чем strict в TypeScript отличается от выражения «строгая типизация»?        | TypeScript → Практики, ограничения и антипаттерны | Новый                 | `ts-strict-mode`           |
| 5      | Когда generic-параметру нужно extends и когда ограничение избыточно?        | TypeScript → Дженерики                            | Новый                 | `ts-generic-constraints`   |
| 6      | Для чего нужен enum и какие есть альтернативы?                              | TypeScript → Базовые и специальные типы           | Новый                 | `ts-enums`                 |
| 7      | Для чего declare global и почему декларация не создаёт глобальное значение? | TypeScript → Практики, ограничения и антипаттерны | Новый                 | `ts-global-augmentation`   |
| 8      | Как распознать типизацию, которая усложняет API без полезной гарантии?      | TypeScript → Практики, ограничения и антипаттерны | Новый                 | `ts-type-complexity`       |

## Источники и предпосылки примеров

Использованы официальная документация TypeScript, release notes и исходные определения компилятора/библиотеки. Примеры самостоятельные, не являются новыми файлами приложения и не выполнялись. Там, где важны null/undefined, подразумевается strictNullChecks; влияние exactOptionalPropertyTypes и noUncheckedIndexedAccess указано в ответах. Поддержка runtime-API и target/lib рассматриваются отдельно от статической аннотации.

- [Как TypeScript проверяет JavaScript-код и что происходит с типами после преобразования?](https://www.typescriptlang.org/docs/handbook/2/basic-types.html) - `ts-language`.
- [Какие гарантии даёт TypeScript и какие ошибки остаются во время выполнения?](https://www.typescriptlang.org/docs/handbook/type-compatibility.html) - `ts-safety-limits`.
- [Что задаёт tsconfig.json и чем target отличается от lib?](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) - `ts-config`.
- [Как работает вывод типов и когда полезна явная аннотация?](https://www.typescriptlang.org/docs/handbook/type-inference.html) - `ts-inference`.
- [Как структурная типизация определяет совместимость и чем отличается от номинальной?](https://www.typescriptlang.org/docs/handbook/type-compatibility.html) - `ts-structural-typing`.
- [Какие примитивные типы описывает TypeScript и почему используют string вместо String?](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) - `ts-primitive-types`.
- [Как strictNullChecks меняет работу с null и undefined?](https://www.typescriptlang.org/tsconfig/strictNullChecks.html) - `ts-nullability`.
- [Что такое литеральный тип и как сохранить точное значение через as const?](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html) - `ts-literal-types`.
- [Когда использовать unknown вместо any и чем опасно необоснованное any?](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html) - `unknown-any`.
- [Что означает void в результате функции и почему callback может вернуть значение?](https://www.typescriptlang.org/docs/handbook/2/functions.html) - `ts-void`.
- [Что означает never и чем он отличается от void?](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html) - `ts-never`.
- [Для чего нужен enum и какие есть альтернативы?](https://www.typescriptlang.org/docs/handbook/enums.html) - `ts-enums`.
- [Чем type отличается от interface и как ими описывать объекты?](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) - `ts-type-interface`.
- [Как optional и readonly меняют контракт свойства?](https://www.typescriptlang.org/tsconfig/exactOptionalPropertyTypes.html) - `ts-property-modifiers`.
- [Как index signature описывает динамические ключи объекта?](https://www.typescriptlang.org/tsconfig/noUncheckedIndexedAccess.html) - `ts-index-signature`.
- [Как interface расширяет один или несколько объектных контрактов?](https://www.typescriptlang.org/docs/handbook/interfaces.html) - `ts-interface-extends`.
- [Что происходит при повторном объявлении interface с одним именем?](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) - `ts-interface-merging`.
- [Как описывать рекурсивные типы и рекурсивные generic-структуры?](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html) - `ts-recursive-types`.
- [Как типизировать обычный, смешанный и двумерный массив?](https://www.typescriptlang.org/docs/handbook/2/objects.html) - `ts-array-types`.
- [Чем readonly T[] и ReadonlyArray<T> отличаются от изменяемого массива?](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html) - `ts-readonly-arrays`.
- [Что такое кортеж и чем он отличается от массива?](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html) - `ts-tuples`.
- [Как типизировать Set и Map и почему важен тип ключа?](https://raw.githubusercontent.com/microsoft/TypeScript/v5.9.3/src/lib/es2015.collection.d.ts) - `ts-set-map`.
- [Как описать тип функции через сигнатуру, type или interface?](https://www.typescriptlang.org/docs/handbook/functions.html) - `ts-function-signatures`.
- [Как типизировать optional, default и rest-параметры?](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html) - `ts-function-parameters`.
- [Как типизировать async-функцию и результат её ожидания?](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html) - `ts-async-functions`.
- [Как объявлять перегрузки функции и какую роль играет реализация?](https://www.typescriptlang.org/docs/handbook/functions.html) - `ts-function-overloads`.
- [Что означает union и какие операции доступны до сужения?](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html) - `ts-union-types`.
- [Как intersection объединяет требования и что происходит с конфликтующими свойствами?](https://raw.githubusercontent.com/microsoft/typescript-go/main/internal/checker/checker.go) - `ts-intersection-types`.
- [Как TypeScript сужает тип через проверки и поток управления?](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) - `ts-control-flow-narrowing`.
- [Как написать type guard с предикатом value is T?](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html) - `ts-type-predicates`.
- [Что означает asserts value is T в assertion function?](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html) - `ts-assertion-functions`.
- [Как discriminated union помогает проверить полноту обработки вариантов?](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) - `ts-discriminated-unions`.
- [Как generics сохраняют связь типов и как выводятся параметры generic-функции?](https://www.typescriptlang.org/docs/handbook/2/generics.html) - `generics`.
- [Когда функции нужны несколько параметров типа?](https://www.typescriptlang.org/docs/handbook/2/generics.html) - `ts-multiple-generics`.
- [Как объявлять generic-типы и читать вложенные обобщения?](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) - `ts-generic-containers`.
- [Когда generic-параметру нужно extends и когда ограничение избыточно?](https://www.typescriptlang.org/docs/handbook/2/functions.html) - `ts-generic-constraints`.
- [Как задавать значение по умолчанию параметру типа?](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-3.html) - `ts-generic-defaults`.
- [Как keyof, T[K] и K extends keyof T типизируют доступ к свойству?](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html) - `ts-keyof-indexed-access`.
- [Чем typeof в позиции типа отличается от JavaScript-оператора typeof?](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html) - `ts-type-query`.
- [Как mapped types преобразуют свойства и их модификаторы?](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html) - `ts-mapped-types`.
- [Как работает conditional type T extends U ? X : Y?](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) - `ts-conditional-types`.
- [Как infer извлекает части типа, например параметры и результат функции?](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) - `ts-infer`.
- [Как отключить дистрибутивность conditional types и проверить never?](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html) - `ts-distributive-never`.
- [Зачем нужны utility types и что меняют Partial, Required и Readonly?](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html) - `ts-object-utilities`.
- [Чем Pick отличается от Omit и удаляют ли они реальные свойства?](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-5.html) - `ts-pick-omit`.
- [Как Record задаёт словарь и чем конечные ключи отличаются от string?](https://raw.githubusercontent.com/microsoft/TypeScript/v5.9.3/src/lib/es5.d.ts) - `ts-record`.
- [Как Exclude, Extract и NonNullable преобразуют union?](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html) - `ts-union-utilities`.
- [Как извлечь параметры и результат функции либо конструктора?](https://www.typescriptlang.org/docs/handbook/utility-types.html) - `ts-signature-utilities`.
- [Как Uppercase, Lowercase, Capitalize и Uncapitalize преобразуют строковые типы?](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html) - `ts-string-utilities`.
- [Что TypeScript добавляет к типизации полей, методов и конструктора класса?](https://www.typescriptlang.org/tsconfig/strictPropertyInitialization.html) - `ts-class-members`.
- [Как объявить перегрузки конструктора, если runtime-конструктор один?](https://www.typescriptlang.org/docs/handbook/2/classes.html) - `ts-constructor-overloads`.
- [Как public, private и protected отличаются от JavaScript-приватности через #?](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html) - `ts-class-visibility`.
- [Для чего нужен abstract class и чем он отличается от интерфейса?](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-6.html) - `ts-abstract-classes`.
- [Чем implements отличается от extends?](https://www.typescriptlang.org/docs/handbook/interfaces.html) - `ts-implements-extends`.
- [Как generic-класс связывает тип полей и методов экземпляра?](https://www.typescriptlang.org/docs/handbook/2/classes.html) - `ts-generic-classes`.
- [Чем strict в TypeScript отличается от выражения «строгая типизация»?](https://www.typescriptlang.org/tsconfig/strict.html) - `ts-strict-mode`.
- [Что делает type assertion через as и чего он не проверяет?](https://www.typescriptlang.org/docs/handbook/basic-types.html) - `ts-type-assertions`.
- [Чем @ts-ignore отличается от @ts-expect-error?](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-9.html) - `ts-diagnostic-directives`.
- [Для чего declare global и почему декларация не создаёт глобальное значение?](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) - `ts-global-augmentation`.
- [Как распознать типизацию, которая усложняет API без полезной гарантии?](https://github.com/microsoft/TypeScript/wiki/Performance) - `ts-type-complexity`.
- [Исходник актуального checker: обработка модификаторов при union/intersection](https://raw.githubusercontent.com/microsoft/typescript-go/main/internal/checker/checker.go) - функции createUnionOrIntersectionProperty и isReadonlySymbol; исходник прочитан, компилятор не запускался.
- [Исходник TypeScript 5.9.3 с тем же правилом модификаторов](https://raw.githubusercontent.com/microsoft/TypeScript/v5.9.3/src/compiler/checker.ts).
- [Keyof Type Operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html).

## Применение

Из корня проекта выполнить `pnpm db:seed`. Seed добавляет новые записи и обновляет существующие по ID, сохраняя отметки и избранное. База при подготовке файлов не изменялась. Сервер, Docker, seed, миграции, компиляция, сборка и проверки не запускались.
