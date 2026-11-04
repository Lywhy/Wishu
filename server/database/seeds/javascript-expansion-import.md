# JavaScript: разбор семи списков вопросов

Обработаны 230 исходных пунктов: в таблицы включены 230 уникальных входных номеров. Они сопоставлены с 115 самостоятельными вопросами каталога. Добавлено 87 новых вопросов с ответами, примерами кода, описанием, выводом и сложностью. Уточнены 4 существующих вопроса, ещё 24 существующих используются без изменений.

Добавлены подразделы «DOM и браузерные API», «Классы», «Ошибки и отладка», «Современный JavaScript», «Производительность» и «Продвинутые темы». «Асинхронность» расширена. Новые вопросы также добавлены в прежние «Функции» и «Объекты и прототипы» согласно уточнённому правилу пользователя.

Существующие ID и расположение записей сохранены; нет объединения нескольких сохранённых ID, удаления вопросов или переноса прогресса. Для нового содержания используется upsert каталога. SQL-миграции, API и интерфейс не менялись. Правило размещать новый вопрос в наиболее подходящем, в том числе предыдущем, подразделе закреплено в AGENTS.md.

## Новое содержание по подразделам

| Подраздел              | Новых вопросов |
| ---------------------- | -------------- |
| Функции                | 1              |
| Объекты и прототипы    | 1              |
| Асинхронность          | 20             |
| DOM и браузерные API   | 26             |
| Классы                 | 9              |
| Ошибки и отладка       | 5              |
| Современный JavaScript | 5              |
| Производительность     | 16             |
| Продвинутые темы       | 4              |

## Сохранённые ID с уточнёнными ответами

- `event-loop`: стек, источники задач, контрольные точки микрозадач, неформальный термин «макротаска» и оговорка об отличиях Node.js.
- `error-handling`: finally при return, новая ошибка внутри catch и ограничения гарантий при завершении среды.
- `instanceof-operator`: Error из другого realm и границы проверки типа.
- `closures-in-loops`: применение правила общей привязки var к callback таймеров.

## Основные объединения и размещение

- Асинхронность: 8–12, 18, 40, 49, 50 и Продвинутые 8 → существующий `event-loop`; 27–30 и Современный JS 14–15 → состояния и разрешение Promise; 33–34 → all/allSettled; 35–36 → race/any; 37–38 и Продвинутые 9 → кооперативная отмена через AbortController.
- Асинхронность: 41–46 → контракт async/await. Запрос с проверкой HTTP-статуса и обработка ошибок ожидания оставлены отдельными практическими вопросами.
- Асинхронность: 6, 53–55 и Производительность 22 → Dedicated Worker и обмен сообщениями. SharedWorker и Service Worker оставлены отдельными из-за разных контрактов и жизненного цикла.
- DOM: 1–2 → дерево и разметка; 3–5 → window/document; 16–17 и 27 → подписки и идентичность обработчика; 18–19, 23 и 25 → target/currentTarget и делегирование; 20–21 и 28 → распространение и отмена действия формы. Пункт 24 о погружении относится к вопросу о фазах события.
- DOM: 34–36 → localStorage/sessionStorage; 39–40 → ненадёжность событий ухода; 41–42 и Производительность 28–29 → режимы загрузки script. Async-обработчик, form.reset и загрузка документа остаются отдельными вопросами.
- Классы: 2–3 и 21, Современный JS 11 → классы и прототипы; 1, 4, 12 → единственный constructor и неявный вариант; 5–6, 8 → прототипный метод и собственное стрелочное поле; 10–11 → extends/super; 17–19 → приватные элементы. Return конструктора выделен из-за отличий базового и производного класса.
- Ошибки: 1–4 → Error, исключение и момент разбора; 7, 13, 16 → собственный Error; 19–21 → отладчик. Throw/try/catch/finally и ошибка внутри catch дополняют прежний вопрос в «Основах языка»; ошибки async объединены с соответствующей темой «Асинхронности».
- Производительность: 1 и 35 → метрики и Core Web Vitals; 2, 8, 9 → узкое место и размер входа; 10–11, 14 и Продвинутые 11 → удержание объектов и очистка; 12 и Продвинутые 10 → достижимость и GC; 24–25 → lazy loading/code splitting.
- Tree shaking из Современного JS 13, Производительности 13 и 26, Продвинутых 19 и минификация из Производительности 27 → один вопрос в «Производительности», различающий удаление ненужного и компактную запись оставшегося.
- Dynamic import из Производительности 30 и Продвинутых 21 → «Современный JavaScript»; top-level await также размещён там как часть выполнения модулей.
- Производительность 33–34 → новый вопрос debounce/throttle в «Функциях». Современный JS 5–6 → объектная деструктуризация с default в «Объектах и прототипах»; массивная деструктуризация уже есть отдельно.
- Современный JS 17 («Что делает set?») неоднозначен: показаны две существующие карточки - Map с методом set и коллекция Set с add. Это явно отмеченное расширенное сопоставление, а не две новые записи.
- Общие callback, callback hell, this, getters/setters, instanceof, scope, TDZ, var в замыканиях, мемоизация, WeakMap/WeakSet, Symbol, итераторы, генераторы, Proxy/Reflect, BigInt, structuredClone и eval переиспользуют сохранённые вопросы.

## Соответствие всем исходным пунктам

Номера локальны исходному списку под соответствующим заголовком. Несколько номеров в строке объединены в один вопрос. Для неоднозначного «set» один исходный номер намеренно встречается в двух строках.

### Асинхронность - 57 пунктов

| Пункты                           | Итоговый вопрос                                                                           | Подраздел          | Решение              | ID                       |
| -------------------------------- | ----------------------------------------------------------------------------------------- | ------------------ | -------------------- | ------------------------ |
| 1                                | Как выполнять запросы через fetch с async/await и проверять HTTP-ошибки?                  | Асинхронность      | Новый                | `async-fetch`            |
| 2, 4, 5, 14, 15, 48              | Что означает асинхронность и неблокирующая модель JavaScript?                             | Асинхронность      | Новый                | `async-model`            |
| 3, 7, 13                         | Почему JavaScript называют однопоточным и чем опасна блокировка event loop?               | Асинхронность      | Новый                | `single-thread-blocking` |
| 6, 53, 54, 55                    | Как Web Worker выполняет работу вне главного потока и обменивается данными?               | Асинхронность      | Новый                | `web-workers`            |
| 8, 9, 10, 11, 12, 18, 40, 49, 50 | Как связаны стек вызовов, задачи и микрозадачи в event loop?                              | Асинхронность      | Уточнён, ID сохранён | `event-loop`             |
| 16, 19, 20                       | Что возвращает setTimeout и почему задержка не гарантирует точное время вызова?           | Асинхронность      | Новый                | `timeouts`               |
| 17                               | Как работает setInterval и когда лучше повторный setTimeout?                              | Асинхронность      | Новый                | `intervals`              |
| 21                               | Для чего нужен queueMicrotask и чем он отличается от Promise.then?                        | Асинхронность      | Новый                | `queue-microtask`        |
| 22                               | Для чего requestAnimationFrame и почему он не равен таймеру на 16 мс?                     | Производительность | Новый                | `animation-frame`        |
| 23                               | Когда применять requestIdleCallback и какие у него ограничения?                           | Производительность | Новый                | `idle-callback`          |
| 24                               | Что такое callback и кто определяет его аргументы?                                        | Функции            | Существующий         | `callback-functions`     |
| 25, 26                           | Что такое callback hell и как уменьшить вложенность?                                      | Функции            | Существующий         | `callback-hell`          |
| 27, 28, 29, 30                   | Что такое Promise и чем fulfilled, rejected, settled и resolved отличаются друг от друга? | Асинхронность      | Новый                | `promise-states`         |
| 31, 32                           | Как работают then, catch и finally в цепочке Promise?                                     | Асинхронность      | Новый                | `promise-chains`         |
| 33, 34                           | Чем Promise.all отличается от Promise.allSettled?                                         | Асинхронность      | Новый                | `promise-all-settled`    |
| 35, 36                           | Чем Promise.race отличается от Promise.any?                                               | Асинхронность      | Новый                | `promise-race-any`       |
| 37, 38                           | Можно ли отменить Promise и как помогают AbortController и AbortSignal?                   | Асинхронность      | Новый                | `abort-controller`       |
| 39                               | Что возвращает Promise.withResolvers и когда он полезен?                                  | Асинхронность      | Новый                | `promise-with-resolvers` |
| 41, 42, 43, 44, 45, 46           | Что возвращает async-функция и что именно приостанавливает await?                         | Асинхронность      | Новый                | `async-await`            |
| 47                               | Как перехватывать ошибки async-функций и почему важен await внутри try?                   | Асинхронность      | Новый                | `async-errors`           |
| 51                               | Как WebSocket поддерживает двусторонний обмен с сервером?                                 | Асинхронность      | Новый                | `websocket`              |
| 52                               | Как ReadableStream и WritableStream обрабатывают данные по частям?                        | Асинхронность      | Новый                | `streams`                |
| 56                               | Чем SharedWorker отличается от отдельного Web Worker?                                     | Асинхронность      | Новый                | `shared-worker`          |
| 57                               | Для чего нужен Service Worker и чем он отличается от обычного Worker?                     | Асинхронность      | Новый                | `service-worker`         |

### DOM - 46 пунктов

| Пункты         | Итоговый вопрос                                                                   | Подраздел            | Решение | ID                          |
| -------------- | --------------------------------------------------------------------------------- | -------------------- | ------- | --------------------------- |
| 1, 2           | Что такое DOM-дерево и чем оно отличается от HTML?                                | DOM и браузерные API | Новый   | `dom-tree`                  |
| 3, 4, 5        | Чем window отличается от document?                                                | DOM и браузерные API | Новый   | `window-document`           |
| 6              | Что предоставляет navigator и почему userAgent не заменяет проверку возможностей? | DOM и браузерные API | Новый   | `navigator-api`             |
| 7, 33          | Как location и History API управляют навигацией?                                  | DOM и браузерные API | Новый   | `history-location`          |
| 8              | Как выбирать DOM-элементы и чем статическая коллекция отличается от живой?        | DOM и браузерные API | Новый   | `dom-selectors`             |
| 9, 10          | Как создать, вставить и удалить DOM-элемент?                                      | DOM и браузерные API | Новый   | `dom-create-remove`         |
| 11, 12         | Что делает innerHTML и почему опасно вставлять недоверенную строку?               | DOM и браузерные API | Новый   | `inner-html`                |
| 13             | Чем HTML-атрибут отличается от свойства DOM-элемента?                             | DOM и браузерные API | Новый   | `dom-attributes-properties` |
| 14             | Как работают data-* и dataset?                                                    | DOM и браузерные API | Новый   | `dom-dataset`               |
| 15, 22, 24     | Как событие проходит фазы погружения, цели и всплытия?                            | DOM и браузерные API | Новый   | `dom-event-phases`          |
| 16, 17, 27     | Чем addEventListener отличается от onclick и как удалить обработчик?              | DOM и браузерные API | Новый   | `dom-listeners`             |
| 18, 19, 23, 25 | Как делегировать события и различать target и currentTarget?                      | DOM и браузерные API | Новый   | `event-delegation`          |
| 20, 21, 28     | Чем stopPropagation отличается от preventDefault и как отменить отправку формы?   | DOM и браузерные API | Новый   | `event-cancellation`        |
| 26             | Что нужно учитывать при await в обработчике DOM-события?                          | DOM и браузерные API | Новый   | `async-event-handler`       |
| 29             | Что восстанавливает form.reset и чего он не сбрасывает?                           | DOM и браузерные API | Новый   | `form-reset`                |
| 30             | Как блокировать прокрутку страницы и корректно возвращать её?                     | DOM и браузерные API | Новый   | `page-scroll-lock`          |
| 31             | Как IntersectionObserver определяет пересечение элемента с областью просмотра?    | DOM и браузерные API | Новый   | `intersection-observer`     |
| 32             | Какие изменения отслеживает MutationObserver?                                     | DOM и браузерные API | Новый   | `mutation-observer`         |
| 34, 35, 36     | Чем localStorage отличается от sessionStorage?                                    | DOM и браузерные API | Новый   | `web-storage`               |
| 37             | Как работает document.cookie и какие ограничения имеют cookies?                   | DOM и браузерные API | Новый   | `document-cookie`           |
| 38             | Чем DOMContentLoaded отличается от load?                                          | DOM и браузерные API | Новый   | `document-ready-events`     |
| 39, 40         | Почему beforeunload и unload нельзя считать надёжным сохранением данных?          | DOM и браузерные API | Новый   | `page-exit-events`          |
| 41, 42         | Чем defer и async у script отличаются и как влияет размещение в head?             | DOM и браузерные API | Новый   | `script-loading`            |
| 43             | Для чего нужен Canvas API и чем рисунок отличается от DOM-элементов?              | DOM и браузерные API | Новый   | `canvas-api`                |
| 44, 45         | Как Shadow DOM изолирует компонент и чем отличается от обычного DOM?              | DOM и браузерные API | Новый   | `shadow-dom`                |
| 46             | Когда использовать IndexedDB вместо Web Storage?                                  | DOM и браузерные API | Новый   | `indexed-db`                |

### Классы - 22 пунктов

| Пункты     | Итоговый вопрос                                                                | Подраздел           | Решение              | ID                        |
| ---------- | ------------------------------------------------------------------------------ | ------------------- | -------------------- | ------------------------- |
| 1, 4, 12   | Можно ли не писать constructor и сколько конструкторов может быть у класса?    | Классы              | Новый                | `class-constructor`       |
| 2, 3, 21   | Что такое class и как классы связаны с функциями-конструкторами и прототипами? | Классы              | Новый                | `classes-prototypes`      |
| 5, 6, 8    | Чем метод класса отличается от функции в свойстве и стрелочного поля?          | Классы              | Новый                | `class-methods-arrows`    |
| 7          | От чего зависит this внутри функции?                                           | Функции             | Существующий         | `function-this`           |
| 9          | Как работает выражение класса const A = class {}?                              | Классы              | Новый                | `class-expression`        |
| 10, 11     | Как extends и super связывают классы?                                          | Классы              | Новый                | `class-inheritance-super` |
| 13         | Что произойдёт при return из конструктора базового и производного класса?      | Классы              | Новый                | `constructor-return`      |
| 14         | Как инициализируются поля класса и значения по умолчанию?                      | Классы              | Новый                | `class-fields`            |
| 15, 16     | Где находятся static-поля и как вызывать статический метод?                    | Классы              | Новый                | `class-static`            |
| 17, 18, 19 | Как работают #приватные элементы и доступны ли они подклассу?                  | Классы              | Новый                | `class-private-elements`  |
| 20         | Как работают геттеры и сеттеры объекта?                                        | Объекты и прототипы | Существующий         | `object-accessors`        |
| 22         | Как работает instanceof и какие у него ограничения?                            | Основы языка        | Уточнён, ID сохранён | `instanceof-operator`     |

### Ошибки и отладка - 21 пунктов

| Пункты              | Итоговый вопрос                                                                | Подраздел        | Решение              | ID                      |
| ------------------- | ------------------------------------------------------------------------------ | ---------------- | -------------------- | ----------------------- |
| 1, 2, 3, 4          | Чем объект Error, исключение и синтаксическая ошибка отличаются друг от друга? | Ошибки и отладка | Новый                | `error-exception-model` |
| 5, 8, 9, 10, 11, 12 | Как выбрасывать и обрабатывать ошибки в JavaScript?                            | Основы языка     | Уточнён, ID сохранён | `error-handling`        |
| 6                   | Какие встроенные типы ошибок важно различать?                                  | Ошибки и отладка | Новый                | `error-types`           |
| 7, 13, 16           | Как создать собственную ошибку и сохранить её причину?                         | Ошибки и отладка | Новый                | `custom-errors`         |
| 14                  | Что показывает stack trace и какие у него ограничения?                         | Ошибки и отладка | Новый                | `error-stack-trace`     |
| 15                  | Как работает instanceof и какие у него ограничения?                            | Основы языка     | Уточнён, ID сохранён | `instanceof-operator`   |
| 17                  | Как работают then, catch и finally в цепочке Promise?                          | Асинхронность    | Новый                | `promise-chains`        |
| 18                  | Как перехватывать ошибки async-функций и почему важен await внутри try?        | Асинхронность    | Новый                | `async-errors`          |
| 19, 20, 21          | Как отлаживать JavaScript в браузере и что делает debugger?                    | Ошибки и отладка | Новый                | `browser-debugging`     |

### Современный JS - 24 пунктов

| Пункты | Итоговый вопрос                                                                           | Подраздел                  | Решение      | ID                               |
| ------ | ----------------------------------------------------------------------------------------- | -------------------------- | ------------ | -------------------------------- |
| 1, 2   | Что такое ECMAScript и почему ES2015 стал крупным обновлением JavaScript?                 | Современный JavaScript     | Новый        | `ecmascript-evolution`           |
| 3      | Чем отличаются var, let и const?                                                          | Основы языка               | Существующий | `variables`                      |
| 4      | Чем стрелочные функции отличаются от обычных и когда их не стоит использовать?            | Функции                    | Существующий | `arrow-functions`                |
| 5, 6   | Как деструктурировать объект, переименовать поле и задать значение по умолчанию?          | Объекты и прототипы        | Новый        | `object-destructuring`           |
| 7, 8   | Как работает spread и насколько глубоко он копирует данные?                               | Основы языка               | Существующий | `spread`                         |
| 9      | Как объединять строки и использовать шаблонные литералы?                                  | Основы языка               | Существующий | `string-concatenation-templates` |
| 10     | Как работает tagged template literal и чем он отличается от обычной интерполяции?         | Современный JavaScript     | Новый        | `tagged-templates`               |
| 11     | Что такое class и как классы связаны с функциями-конструкторами и прототипами?            | Классы                     | Новый        | `classes-prototypes`             |
| 12     | Как import и export связывают ES-модули?                                                  | Современный JavaScript     | Новый        | `es-modules`                     |
| 13     | Что такое tree shaking и чем оно отличается от минификации?                               | Производительность         | Новый        | `tree-shaking`                   |
| 14, 15 | Что такое Promise и чем fulfilled, rejected, settled и resolved отличаются друг от друга? | Асинхронность              | Новый        | `promise-states`                 |
| 16, 17 | Что такое Map и когда он удобнее обычного объекта?                                        | Массивы и структуры данных | Существующий | `map-vs-object`                  |
| 17     | Что такое Set и как он определяет уникальность значений?                                  | Массивы и структуры данных | Существующий | `set-collection`                 |
| 18     | Что такое Symbol и где его используют?                                                    | Основы языка               | Существующий | `symbol`                         |
| 19     | Как связаны генераторы, итераторы и Symbol.iterator?                                      | Функции                    | Существующий | `iterator-protocols`             |
| 20     | Как работают function*, yield и return в генераторе?                                      | Функции                    | Существующий | `generator-functions`            |
| 21     | Как Proxy перехватывает операции и что такое ловушки?                                     | Объекты и прототипы        | Существующий | `proxy-traps`                    |
| 22     | Чем Reflect отличается от Object и что возвращает Reflect.defineProperty?                 | Объекты и прототипы        | Существующий | `reflect-object-operations`      |
| 23     | Чем BigInt отличается от Number?                                                          | Основы языка               | Существующий | `bigint-number`                  |
| 24     | Как сделать глубокую копию через structuredClone и какие у неё ограничения?               | Объекты и прототипы        | Существующий | `structured-clone`               |

### Производительность - 35 пунктов

| Пункты     | Итоговый вопрос                                                                     | Подраздел                  | Решение      | ID                          |
| ---------- | ----------------------------------------------------------------------------------- | -------------------------- | ------------ | --------------------------- |
| 1, 35      | Какие метрики описывают производительность страницы и что измеряют Core Web Vitals? | Производительность         | Новый        | `performance-metrics`       |
| 2, 8, 9    | Как найти узкое место и учесть размер входных данных?                               | Производительность         | Новый        | `performance-bottleneck`    |
| 3          | Чем CPU-bound задача отличается от I/O-bound?                                       | Производительность         | Новый        | `cpu-io-bound`              |
| 4, 20      | Почему JavaScript называют однопоточным и чем опасна блокировка event loop?         | Асинхронность              | Новый        | `single-thread-blocking`    |
| 5          | Что означает асинхронность и неблокирующая модель JavaScript?                       | Асинхронность              | Новый        | `async-model`               |
| 6, 7       | Что такое мемоизация и какие ограничения есть у кеша функции?                       | Функции                    | Существующий | `function-memoization`      |
| 10, 11, 14 | Почему возникают утечки памяти в SPA и как очищать таймеры и подписки?              | Производительность         | Новый        | `memory-leaks`              |
| 12         | Как сборщик мусора определяет ненужные объекты и почему циклы не всегда утечка?     | Производительность         | Новый        | `garbage-collection`        |
| 13, 26, 27 | Что такое tree shaking и чем оно отличается от минификации?                         | Производительность         | Новый        | `tree-shaking`              |
| 15         | Как искать утечки через профилирование памяти?                                      | Производительность         | Новый        | `memory-profiling`          |
| 16, 17     | Чем layout отличается от paint и зачем группировать чтения и изменения DOM?         | Производительность         | Новый        | `layout-paint-batching`     |
| 18         | Зачем используют virtual DOM и гарантирует ли он лучшую производительность?         | Производительность         | Новый        | `virtual-dom`               |
| 19         | Всегда ли цикл быстрее методов массива?                                             | Производительность         | Новый        | `array-methods-performance` |
| 21         | Как разбить тяжёлую задачу и дать браузеру обработать ввод?                         | Производительность         | Новый        | `split-long-tasks`          |
| 22         | Как Web Worker выполняет работу вне главного потока и обменивается данными?         | Асинхронность              | Новый        | `web-workers`               |
| 23         | Как уменьшать стоимость HTTP-загрузок, не ориентируясь только на число запросов?    | Производительность         | Новый        | `network-cost`              |
| 24, 25     | Чем lazy loading отличается от code splitting?                                      | Производительность         | Новый        | `lazy-code-splitting`       |
| 28, 29     | Чем defer и async у script отличаются и как влияет размещение в head?               | DOM и браузерные API       | Новый        | `script-loading`            |
| 30         | Что возвращает import() и как он связан с загрузкой кода по требованию?             | Современный JavaScript     | Новый        | `dynamic-import`            |
| 31         | Как измерять время JavaScript-кода и не получить случайный результат?               | Производительность         | Новый        | `measure-js-performance`    |
| 32         | Чем WeakMap и WeakSet отличаются от Map и Set?                                      | Массивы и структуры данных | Существующий | `weak-collections`          |
| 33, 34     | Чем debounce отличается от throttle?                                                | Функции                    | Новый        | `debounce-throttle`         |

### Продвинутые темы - 25 пунктов

| Пункты | Итоговый вопрос                                                                 | Подраздел              | Решение              | ID                          |
| ------ | ------------------------------------------------------------------------------- | ---------------------- | -------------------- | --------------------------- |
| 1, 2   | Что такое execution context и какие данные нужны для выполнения кода?           | Продвинутые темы       | Новый                | `execution-context`         |
| 3, 4   | Что такое область видимости переменной?                                         | Основы языка           | Существующий         | `scope`                     |
| 5      | Как устроены глобальные переменные и чем они отличаются от свойств globalThis?  | Основы языка           | Существующий         | `global-variables`          |
| 6      | Почему var в цикле приводит к неожиданным значениям в замыканиях?               | Функции                | Уточнён, ID сохранён | `closures-in-loops`         |
| 7      | Что такое hoisting и что произойдёт при обращении к переменной до объявления?   | Основы языка           | Существующий         | `hoisting`                  |
| 8      | Как связаны стек вызовов, задачи и микрозадачи в event loop?                    | Асинхронность          | Уточнён, ID сохранён | `event-loop`                |
| 9      | Можно ли отменить Promise и как помогают AbortController и AbortSignal?         | Асинхронность          | Новый                | `abort-controller`          |
| 10     | Как сборщик мусора определяет ненужные объекты и почему циклы не всегда утечка? | Производительность     | Новый                | `garbage-collection`        |
| 11     | Почему возникают утечки памяти в SPA и как очищать таймеры и подписки?          | Производительность     | Новый                | `memory-leaks`              |
| 12     | Что такое дескриптор свойства и как defineProperty задаёт его флаги?            | Объекты и прототипы    | Существующий         | `property-descriptors`      |
| 13, 15 | Как Proxy перехватывает операции и что такое ловушки?                           | Объекты и прототипы    | Существующий         | `proxy-traps`               |
| 14     | Чем Reflect отличается от Object и что возвращает Reflect.defineProperty?       | Объекты и прототипы    | Существующий         | `reflect-object-operations` |
| 16     | Как связаны генераторы, итераторы и Symbol.iterator?                            | Функции                | Существующий         | `iterator-protocols`        |
| 17     | Как работают function*, yield и return в генераторе?                            | Функции                | Существующий         | `generator-functions`       |
| 18     | Чем async-генератор отличается от обычного генератора?                          | Асинхронность          | Новый                | `async-generators`          |
| 19     | Что такое tree shaking и чем оно отличается от минификации?                     | Производительность     | Новый                | `tree-shaking`              |
| 20     | Как top-level await влияет на выполнение ES-модулей?                            | Современный JavaScript | Новый                | `top-level-await`           |
| 21     | Что возвращает import() и как он связан с загрузкой кода по требованию?         | Современный JavaScript | Новый                | `dynamic-import`            |
| 22     | Почему eval опасен и чем его заменить?                                          | Основы языка           | Существующий         | `eval-risks`                |
| 23     | Что делает WeakRef и почему на него нельзя опирать обязательную логику?         | Продвинутые темы       | Новый                | `weak-ref`                  |
| 24     | Как SharedArrayBuffer позволяет разделять память между агентами?                | Продвинутые темы       | Новый                | `shared-array-buffer`       |
| 25     | Какие задачи решает Temporal API и чем его типы отличаются от Date?             | Продвинутые темы       | Новый                | `temporal-api`              |

## Источники и версионные нюансы

Основные нюансы сверены с MDN, спецификацией ECMAScript, документацией Chrome DevTools, V8, Rollup и React. Поддержка Temporal, requestIdleCallback, shared memory и новых API описана с оговоркой о целевой среде. Код примеров не выполнялся; внешние файлы Worker и модулей в примерах обозначены как необходимые предпосылки.

- [Что означает асинхронность и неблокирующая модель JavaScript?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Introducing) - `async-model`.
- [Почему JavaScript называют однопоточным и чем опасна блокировка event loop?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model) - `single-thread-blocking`.
- [Как связаны стек вызовов, задачи и микрозадачи в event loop?](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth) - `event-loop`.
- [Что возвращает setTimeout и почему задержка не гарантирует точное время вызова?](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout) - `timeouts`.
- [Как работает setInterval и когда лучше повторный setTimeout?](https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval) - `intervals`.
- [Для чего нужен queueMicrotask и чем он отличается от Promise.then?](https://developer.mozilla.org/en-US/docs/Web/API/Window/queueMicrotask) - `queue-microtask`.
- [Что такое Promise и чем fulfilled, rejected, settled и resolved отличаются друг от друга?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) - `promise-states`.
- [Как работают then, catch и finally в цепочке Promise?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) - `promise-chains`.
- [Чем Promise.all отличается от Promise.allSettled?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) - `promise-all-settled`.
- [Чем Promise.race отличается от Promise.any?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any) - `promise-race-any`.
- [Можно ли отменить Promise и как помогают AbortController и AbortSignal?](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) - `abort-controller`.
- [Что возвращает Promise.withResolvers и когда он полезен?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers) - `promise-with-resolvers`.
- [Что возвращает async-функция и что именно приостанавливает await?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) - `async-await`.
- [Как выполнять запросы через fetch с async/await и проверять HTTP-ошибки?](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) - `async-fetch`.
- [Как перехватывать ошибки async-функций и почему важен await внутри try?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) - `async-errors`.
- [Как Web Worker выполняет работу вне главного потока и обменивается данными?](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) - `web-workers`.
- [Как WebSocket поддерживает двусторонний обмен с сервером?](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) - `websocket`.
- [Как ReadableStream и WritableStream обрабатывают данные по частям?](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams) - `streams`.
- [Чем SharedWorker отличается от отдельного Web Worker?](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker) - `shared-worker`.
- [Для чего нужен Service Worker и чем он отличается от обычного Worker?](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) - `service-worker`.
- [Чем async-генератор отличается от обычного генератора?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function*) - `async-generators`.
- [Что такое DOM-дерево и чем оно отличается от HTML?](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) - `dom-tree`.
- [Чем window отличается от document?](https://developer.mozilla.org/en-US/docs/Web/API/Window) - `window-document`.
- [Что предоставляет navigator и почему userAgent не заменяет проверку возможностей?](https://developer.mozilla.org/en-US/docs/Web/API/Navigator) - `navigator-api`.
- [Как location и History API управляют навигацией?](https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API) - `history-location`.
- [Как выбирать DOM-элементы и чем статическая коллекция отличается от живой?](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) - `dom-selectors`.
- [Как создать, вставить и удалить DOM-элемент?](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) - `dom-create-remove`.
- [Что делает innerHTML и почему опасно вставлять недоверенную строку?](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) - `inner-html`.
- [Чем HTML-атрибут отличается от свойства DOM-элемента?](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checked) - `dom-attributes-properties`.
- [Как работают data-* и dataset?](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) - `dom-dataset`.
- [Как событие проходит фазы погружения, цели и всплытия?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling) - `dom-event-phases`.
- [Чем addEventListener отличается от onclick и как удалить обработчик?](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) - `dom-listeners`.
- [Как делегировать события и различать target и currentTarget?](https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget) - `event-delegation`.
- [Чем stopPropagation отличается от preventDefault и как отменить отправку формы?](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) - `event-cancellation`.
- [Что восстанавливает form.reset и чего он не сбрасывает?](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset) - `form-reset`.
- [Что нужно учитывать при await в обработчике DOM-события?](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent) - `async-event-handler`.
- [Как блокировать прокрутку страницы и корректно возвращать её?](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow) - `page-scroll-lock`.
- [Как IntersectionObserver определяет пересечение элемента с областью просмотра?](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) - `intersection-observer`.
- [Какие изменения отслеживает MutationObserver?](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) - `mutation-observer`.
- [Чем localStorage отличается от sessionStorage?](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) - `web-storage`.
- [Как работает document.cookie и какие ограничения имеют cookies?](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) - `document-cookie`.
- [Чем DOMContentLoaded отличается от load?](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event) - `document-ready-events`.
- [Почему beforeunload и unload нельзя считать надёжным сохранением данных?](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event) - `page-exit-events`.
- [Чем defer и async у script отличаются и как влияет размещение в head?](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script) - `script-loading`.
- [Для чего нужен Canvas API и чем рисунок отличается от DOM-элементов?](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) - `canvas-api`.
- [Как Shadow DOM изолирует компонент и чем отличается от обычного DOM?](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM) - `shadow-dom`.
- [Когда использовать IndexedDB вместо Web Storage?](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) - `indexed-db`.
- [Что такое class и как классы связаны с функциями-конструкторами и прототипами?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) - `classes-prototypes`.
- [Можно ли не писать constructor и сколько конструкторов может быть у класса?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor) - `class-constructor`.
- [Что произойдёт при return из конструктора базового и производного класса?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor) - `constructor-return`.
- [Чем метод класса отличается от функции в свойстве и стрелочного поля?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields) - `class-methods-arrows`.
- [Как работает выражение класса const A = class {}?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/class) - `class-expression`.
- [Как extends и super связывают классы?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends) - `class-inheritance-super`.
- [Как инициализируются поля класса и значения по умолчанию?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields) - `class-fields`.
- [Где находятся static-поля и как вызывать статический метод?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) - `class-static`.
- [Как работают #приватные элементы и доступны ли они подклассу?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements) - `class-private-elements`.
- [Чем объект Error, исключение и синтаксическая ошибка отличаются друг от друга?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) - `error-exception-model`.
- [Какие встроенные типы ошибок важно различать?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) - `error-types`.
- [Как создать собственную ошибку и сохранить её причину?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error) - `custom-errors`.
- [Что показывает stack trace и какие у него ограничения?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack) - `error-stack-trace`.
- [Как отлаживать JavaScript в браузере и что делает debugger?](https://developer.chrome.com/docs/devtools/javascript) - `browser-debugging`.
- [Что такое ECMAScript и почему ES2015 стал крупным обновлением JavaScript?](https://tc39.es/ecma262/) - `ecmascript-evolution`.
- [Как работает tagged template literal и чем он отличается от обычной интерполяции?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) - `tagged-templates`.
- [Как import и export связывают ES-модули?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) - `es-modules`.
- [Что возвращает import() и как он связан с загрузкой кода по требованию?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) - `dynamic-import`.
- [Как top-level await влияет на выполнение ES-модулей?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) - `top-level-await`.
- [Как деструктурировать объект, переименовать поле и задать значение по умолчанию?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring) - `object-destructuring`.
- [Какие метрики описывают производительность страницы и что измеряют Core Web Vitals?](https://web.dev/articles/vitals) - `performance-metrics`.
- [Как найти узкое место и учесть размер входных данных?](https://developer.chrome.com/docs/devtools/performance) - `performance-bottleneck`.
- [Чем CPU-bound задача отличается от I/O-bound?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Introducing) - `cpu-io-bound`.
- [Для чего requestAnimationFrame и почему он не равен таймеру на 16 мс?](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) - `animation-frame`.
- [Когда применять requestIdleCallback и какие у него ограничения?](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) - `idle-callback`.
- [Почему возникают утечки памяти в SPA и как очищать таймеры и подписки?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management) - `memory-leaks`.
- [Как сборщик мусора определяет ненужные объекты и почему циклы не всегда утечка?](https://v8.dev/blog/trash-talk) - `garbage-collection`.
- [Как искать утечки через профилирование памяти?](https://developer.chrome.com/docs/devtools/memory-problems) - `memory-profiling`.
- [Чем layout отличается от paint и зачем группировать чтения и изменения DOM?](https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing) - `layout-paint-batching`.
- [Зачем используют virtual DOM и гарантирует ли он лучшую производительность?](https://react.dev/learn/render-and-commit) - `virtual-dom`.
- [Всегда ли цикл быстрее методов массива?](https://v8.dev/blog/retiring-octane) - `array-methods-performance`.
- [Как разбить тяжёлую задачу и дать браузеру обработать ввод?](https://web.dev/articles/optimize-long-tasks) - `split-long-tasks`.
- [Как уменьшать стоимость HTTP-загрузок, не ориентируясь только на число запросов?](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Optimizing_startup_performance) - `network-cost`.
- [Чем lazy loading отличается от code splitting?](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading) - `lazy-code-splitting`.
- [Что такое tree shaking и чем оно отличается от минификации?](https://rollupjs.org/introduction/) - `tree-shaking`.
- [Как измерять время JavaScript-кода и не получить случайный результат?](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now) - `measure-js-performance`.
- [Чем debounce отличается от throttle?](https://developer.mozilla.org/en-US/docs/Glossary/Debounce) - `debounce-throttle`.
- [Что такое execution context и какие данные нужны для выполнения кода?](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html) - `execution-context`.
- [Что делает WeakRef и почему на него нельзя опирать обязательную логику?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef) - `weak-ref`.
- [Как SharedArrayBuffer позволяет разделять память между агентами?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) - `shared-array-buffer`.
- [Какие задачи решает Temporal API и чем его типы отличаются от Date?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal) - `temporal-api`.
- [MDN: unload и ограничения жизненного цикла](https://developer.mozilla.org/en-US/docs/Web/API/Window/unload_event).
- [MDN: WritableStream](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream).
- [MDN: throttle](https://developer.mozilla.org/en-US/docs/Glossary/Throttle).
- [MDN: Atomics](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics).
- [MDN: try/catch/finally](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch).

## Применение

Из корня проекта выполнить `pnpm db:seed`. Эта команда добавит контент и обновит сохранённые вопросы по ID; существующий прогресс и избранное сохраняются. База при подготовке файлов не изменялась. Сервер, Docker, seed, миграции, сборка и проверки не запускались.
