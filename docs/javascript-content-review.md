# JavaScript: обновление ответов и полноты тем

Дата: 2026-11-06.

## Результат анализа

В исходном разделе было 196 вопросов в 11 подразделах. У каждого уже имелся кодовый пример. Базовые темы, функции, объекты, Promise, DOM и производительность покрыты широко; расширять каталог повторными формулировками не требуется.

Основные проблемы представления: длинный начальный абзац, несколько важных мыслей внутри одного пункта, механическое выделение текста и разрыв между ответом и примером. Также не было отдельных вопросов для ряда практических ситуаций: ограничения точности чисел, гонки запросов, управление параллелизмом и раннее чтение циклических импортов.

## Что обновлено

- Все 196 существующих ответов получили короткую выжимку и структурированные пояснения. Идентификаторы, связи, порядок и отметки популярности существующих вопросов сохранены.
- 15 ключевых ответов переписаны содержательно: типы данных, сравнение, объявления переменных, hoisting, замыкания, this, состояния Promise, цепочки Promise, event loop, async/await, fetch, structuredClone, Object.assign, sort, ES-модули. Точный список ID - javascript-rewritten-ids.json.
- Остальные 181 ответ структурированы на основе существующего объяснения; это не повторная независимая техническая экспертиза каждого утверждения во всех этих ответах.
- JavaScript-ответ отображается единым Markdown-документом: короткий ответ, разбор с подзаголовками/таблицами/списками, пример с подсветкой, типичная ошибка при наличии и главная мысль. Код не дублируется отдельным вторым блоком. Другие языки не переформатированы в рамках этой работы.
- Существующие примеры сохранены, кроме явно переработанных примеров ключевых ответов. У всех 208 вопросов JavaScript есть кодовый пример.

## 12 добавленных вопросов

| Подраздел                  | Вопрос                                                                         | ID                        |
| -------------------------- | ------------------------------------------------------------------------------ | ------------------------- |
| Основы языка               | Почему 0.1 + 0.2 не равно 0.3 и как сравнивать дробные числа?                  | number-precision          |
| Основы языка               | Чем Object.is и SameValueZero отличаются от строгого равенства?                | same-value-comparisons    |
| Объекты и прототипы        | Как Symbol.toPrimitive, valueOf и toString участвуют в преобразовании объекта? | object-to-primitive       |
| Объекты и прототипы        | Что такое prototype pollution и как защищать словари и слияние объектов?       | prototype-pollution       |
| Асинхронность              | Когда выполняется executor Promise и почему нельзя делать его async?           | promise-executor-order    |
| Асинхронность              | Как ограничить число одновременно выполняемых асинхронных операций?            | async-concurrency-limit   |
| Асинхронность              | Как избежать устаревшего результата при гонке поисковых запросов?              | request-races             |
| Массивы и структуры данных | Как связаны ArrayBuffer, TypedArray и DataView?                                | typed-arrays              |
| Продвинутые темы           | Что хранит Date и как не перепутать UTC, локальное время и календарную дату?   | dates-timezones           |
| Продвинутые темы           | Почему test с регулярным выражением /g может чередовать true и false?          | regexp-last-index         |
| Современный JavaScript     | Когда циклический import работает, а когда приводит к ReferenceError?          | esm-circular-dependencies |
| Продвинутые темы           | Для чего нужен FinalizationRegistry и почему он не заменяет явную очистку?     | finalization-registry     |

## Объединения и границы тем

Существующие вопросы не удалялись и не объединялись по разным ID, поэтому перенос прогресса не требуется. Новые темы относятся к существующим подразделам:

- Алгоритмы сравнения коллекций выделены отдельно от приведения типов в ==/===.
- Механизм Symbol.toPrimitive раскрывает протокол преобразования объекта, а не повторяет общую вводную о coercion.
- Гонка запросов рассматривает актуальность результата; отмена через AbortController уже изучается отдельно.
- Ограничение параллелизма относится к моменту запуска работы; Promise.all уже описывает ожидание результатов.
- Циклические импорты показывают конкретный порядок инициализации; общий вопрос import/export сохранён.
- FinalizationRegistry описывает регистрацию и необязательный callback; вопрос о слабой ссылке WeakRef сохранён.

## Итоговые объёмы

Основы - 38; функции - 33; объекты - 21; асинхронность - 24; массивы - 23; DOM - 26; классы - 9; ошибки - 5; современный JavaScript - 6; производительность - 16; продвинутые темы - 7. Всего JavaScript - 208, весь каталог - 490.

## Источники для технических уточнений

- [Сравнения и SameValueZero](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness)
- [Модель выполнения](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model)
- [Конструктор Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise)
- [Цепочка then](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)
- [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [Погрешность чисел и EPSILON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON)
- [Symbol.toPrimitive](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive)
- [Prototype pollution](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/Prototype_pollution)
- [Typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Typed_arrays)
- [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [RegExp.test и lastIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
- [ES-модули](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [FinalizationRegistry](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry)
- [Стабильность sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [Structured clone](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)
- [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

Примеры написаны под описанные условия. Сетевые функции требуют приложения и обработки ошибок; пример циклического импорта состоит из двух отдельных файлов; финализатор не имеет гарантированного момента вызова. Не заявляется универсальный порядок задач для всех runtime или одинаковая поддержка всех современных API.

## Применение и проверка

Из корня проекта пользователь выполняет:

```powershell
pnpm db:seed
```

Затем обновляет страницу браузера для сброса клиентского кеша каталога. Новая SQL-миграция не требуется. Применённые миграции не менялись.

Агентом не запускались seed, сервер, Docker, сборка, компилятор, линтер, тесты или код примеров. Выполнены чтение контента/исходников, сверка отдельных технических деталей с документацией и форматирование oxfmt. Рекомендуется вручную проверить новый вид таблиц, списков, кодовых блоков и предупреждений на узком экране и в обеих темах.
