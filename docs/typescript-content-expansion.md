# Расширение TypeScript для собеседований

Исходно: 60 вопросов в 12 подразделах. Добавлено: 39. Дополнено существующих: 19. Теперь: 99 вопросов в 14 подразделах. Новые вопросы размещены по проверяемому навыку, а не по количеству ключевых слов. Другие технологические разделы не изменены.

## Что было покрыто

Определения типов, базовые generics, type/interface, сужение, union/intersection и стандартные utilities уже присутствовали. Повторные определения unknown, never, keyof, Partial, Promise и interface не добавлялись. Основные пробелы: реальные ограничения вывода и совместимости, модульный конвейер и проектирование прикладного API.

## Распределение

| Подраздел                            | Всего | Добавлено |
| ------------------------------------ | ----: | --------: |
| Основы TypeScript                    |     5 |         0 |
| Базовые и специальные типы           |     8 |         1 |
| Объектные типы и интерфейсы          |     7 |         1 |
| Массивы, кортежи и коллекции         |     6 |         2 |
| Типизация функций                    |     7 |         3 |
| Union и Intersection Types           |     2 |         0 |
| Сужение типов и Type Guards          |     5 |         1 |
| Дженерики                            |     8 |         3 |
| Операторы типов и преобразования     |     8 |         2 |
| Utility Types                        |     7 |         1 |
| Типизация классов и ООП              |     9 |         3 |
| Практики, ограничения и антипаттерны |     9 |         4 |
| Модули и сборка                      |    10 |        10 |
| Проектирование типобезопасных API    |     8 |         8 |

## Новые вопросы

### Базовые и специальные типы

- ts-empty-object-types: Чем различаются object, Object и {}?
  Проверяемый навык: Границы типов для объектов и значений без null и undefined при strictNullChecks.

### Объектные типы и интерфейсы

- ts-runtime-object-keys: Почему Object.keys возвращает string[], а не (keyof T)[]?
  Проверяемый навык: Разница между видимой статической формой объекта и его реальными перечисляемыми ключами.

### Массивы, кортежи и коллекции

- ts-variadic-tuples: Как variadic tuple types сохраняют позиции при объединении аргументов?
  Проверяемый навык: Типизация операций над наборами аргументов без потери порядка и длины.
- ts-nonempty-array: Как выразить непустой массив и подтвердить это во время выполнения?
  Проверяемый навык: Моделирование хотя бы одного элемента без безусловного non-null assertion.

### Типизация функций

- ts-function-variance: Почему callback с более узким параметром может быть небезопасен?
  Проверяемый навык: Совместимость функций при strictFunctionTypes и отличие методов от свойств-функций.
- ts-this-parameter: Как явно описать this функции и контекст методов объектного литерала?
  Проверяемый навык: Служебный this-параметр, this: void и контекстный маркер ThisType.
- ts-generator-contract: Что означают три параметра Generator<Yield, Return, Next>?
  Проверяемый навык: Раздельная типизация выдаваемых значений, результата завершения и входов next.

### Сужение типов и Type Guards

- ts-narrowing-closures: Когда сужение типа сохраняется внутри callback, а когда теряется?
  Проверяемый навык: Переназначение переменной, время создания замыкания и устойчивая локальная ссылка.

### Дженерики

- ts-const-type-parameters: Когда const-параметр типа сохраняет литеральную точность аргумента?
  Проверяемый навык: Вывод литерального объектного или кортежного типа на стороне generic API.
- ts-generic-constraint-return: Почему нельзя вернуть произвольный Constraint как результат T extends Constraint?
  Проверяемый навык: Обещание сохранить конкретный подтип и границы минимального ограничения.
- ts-generic-variance: Как позиция параметра типа влияет на совместимость generic-контейнеров?
  Проверяемый навык: Ковариантность производителя, контравариантность потребителя и ограничения mutable API.

### Операторы типов и преобразования

- ts-template-literal-patterns: Как template literal types ограничивают формат строкового контракта?
  Проверяемый навык: Строковые комбинации, шаблоны и извлечение частей на уровне типов.
- ts-deep-readonly-contract: Как определить DeepReadonly и заранее ограничить область его применения?
  Проверяемый навык: Рекурсивное преобразование вложенных данных без обещания универсальной заморозки.

### Utility Types

- ts-no-infer: Когда NoInfer помогает выбрать источник вывода generic-параметра?
  Проверяемый навык: Проверка зависимого аргумента без расширения допустимых значений за его счёт.

### Типизация классов и ООП

- ts-override-contract: Зачем нужны override и noImplicitOverride?
  Проверяемый навык: Защита намеренного переопределения при изменении базового класса.
- ts-polymorphic-this: Как полиморфный this сохраняет тип наследника в цепочке методов?
  Проверяемый навык: Fluent API, в котором методы родителя не теряют конкретный тип объекта.
- ts-decorators-models: Чем современные декораторы TypeScript отличаются от legacy-декораторов?
  Проверяемый навык: Модель value/context, experimentalDecorators и ограничения совместимости метаданных.

### Практики, ограничения и антипаттерны

- ts-satisfies: Чем satisfies отличается от аннотации типа и as?
  Проверяемый навык: Проверка соответствия объектного литерала с сохранением полезной точности вывода.
- ts-unchecked-index-access: Что обнаруживает noUncheckedIndexedAccess при чтении массива и словаря?
  Проверяемый навык: Возможное отсутствие значения у непроверенного индекса независимо от типа элемента.
- ts-class-field-emit: Почему useDefineForClassFields может изменить поведение полей класса?
  Проверяемый навык: Разница между стандартным определением поля и историческим emit через присваивание.
- ts-dom-boundaries: Как безопасно получить тип DOM-элемента и обработать EventTarget?
  Проверяемый навык: Граница между общими DOM-декларациями и проверяемым видом элемента.

### Модули и сборка

- ts-type-only-imports: Как import type и verbatimModuleSyntax отделяют типы от runtime-зависимостей?
  Проверяемый навык: Явное удаление типовых импортов и сохранение необходимых побочных эффектов модуля.
- ts-module-resolution: Как согласовать module, moduleResolution и aliases с реальной средой запуска?
  Проверяемый навык: Разделение формата модулей, поиска файлов и разрешения путей во время выполнения.
- ts-declaration-files: Что описывают .d.ts и откуда TypeScript получает типы JavaScript-библиотеки?
  Проверяемый навык: Декларации пакета, @types, локальный shim и границы ambient-объявлений.
- ts-library-declaration-publishing: Как публиковать библиотеку, чтобы её JavaScript и декларации описывали один API?
  Проверяемый навык: Публичные экспорты, declaration emit и соответствие пакетных точек входа.
- ts-esm-cjs-contract: Почему импорт CommonJS-пакета может типизироваться, но не работать в выбранной ESM-среде?
  Проверяемый навык: Границы esModuleInterop, allowSyntheticDefaultImports и моделирования формата файла.
- ts-isolated-compilation: Чем isolatedModules отличается от isolatedDeclarations?
  Проверяемый навык: Ограничения независимого преобразования файла в JS и независимого создания деклараций.
- ts-project-references: Как project references помогают организовать проверку большого проекта?
  Проверяемый навык: Граф TypeScript-проектов, composite, декларации и инкрементальная сборка.
- ts-ambient-types-scope: Как types и typeRoots помогают контролировать глобальные типы окружения?
  Проверяемый навык: Предотвращение случайного смешивания браузерных, Node и тестовых глобальных деклараций.
- ts-check-javascript: Как постепенно проверять JavaScript через allowJs, checkJs и JSDoc?
  Проверяемый навык: Миграция без обязательного переименования всей кодовой базы в .ts.
- ts-skip-lib-check: Что действительно отключает skipLibCheck и когда он скрывает проблему зависимостей?
  Проверяемый навык: Цена проверки declaration files и диагностика конфликтующих версий типов.

### Проектирование типобезопасных API

- ts-branded-identifiers: Как branded types защищают от смешивания одинаковых по форме идентификаторов?
  Проверяемый навык: Разделение UserId и OrderId поверх строк с контролируемой точкой создания.
- ts-validated-api-boundary: Как связать результат запроса с валидатором, не обещая произвольный T?
  Проверяемый навык: Generic API, в котором тип результата обоснован реальным parser-контрактом.
- ts-result-error-contract: Когда Result<T, E> полезнее обещания «Promise вернёт T или бросит ошибку»?
  Проверяемый навык: Явные ожидаемые отказы в возвращаемом контракте и границы исключений.
- ts-event-map-correlation: Как типизировать связь имени события и аргументов обработчика?
  Проверяемый навык: Event map с кортежами параметров вместо независимых широких union.
- ts-exclusive-options: Как запретить одновременную передачу двух альтернативных параметров?
  Проверяемый навык: Взаимоисключающие конфигурации через union и запрещённое свойство never.
- ts-typestate-api: Как сделать недопустимый порядок вызовов недоступным в типах API?
  Проверяемый навык: Разные интерфейсы состояний вместо необязательных полей и постоянных assertions.
- ts-dto-domain-boundary: Почему транспортный DTO стоит отделять от доменной модели?
  Проверяемый навык: Преобразование строк, дат и инвариантов на границе сериализации.
- ts-function-wrapper-contract: Как сохранить контракт функции в обёртке и где Parameters/ReturnType недостаточно?
  Проверяемый навык: Сохранение this и параметров обычной функции без ложного обещания поддержки всех перегрузок.

## Что объединено с существующими ответами

Ниже перечислены кандидаты на новые карточки, оставленные в канонических вопросах. Сохранён старый ID; новые дубли не создавались.

- Excess property checks вместо отдельного повторного вопроса о совместимости объектов → «Как структурная типизация определяет совместимость и чем отличается от номинальной?» (ts-structural-typing).
- Отсутствие optional-поля и явный undefined при exactOptionalPropertyTypes → «Как optional и readonly меняют контракт свойства?» (ts-property-modifiers).
- Контекстная типизация и расширение литералов в существующем вопросе о выводе → «Как работает вывод типов и когда полезна явная аннотация?» (ts-inference).
- Граница as const для внешних ссылок без новой карточки о неизменяемости → «Что такое литеральный тип и как сохранить точное значение через as const?» (ts-literal-types).
- Вывод предикатов TypeScript 5.5 и неоднозначность truthy-filter → «Как написать type guard с предикатом value is T?» (ts-type-predicates).
- Повторное присваивание и optional-свойства внутри in-проверок → «Как TypeScript сужает тип через проверки и поток управления?» (ts-control-flow-narrowing).
- Моделирование состояния и сохранение корреляции после деструктуризации → «Как discriminated union помогает проверить полноту обработки вариантов?» (ts-discriminated-unions).
- Key remapping и фильтрация через never внутри существующего mapped types → «Как mapped types преобразуют свойства и их модификаторы?» (ts-mapped-types).
- Проекция union и явная дистрибутивность вместо новой карточки про каждый helper → «Чем Pick отличается от Omit и удаляют ли они реальные свойства?» (ts-pick-omit).
- Awaited, PromiseLike и отсутствие типового канала исключения → «Как типизировать async-функцию и результат её ожидания?» (ts-async-functions).
- Вызываемые объекты и конструкторные сигнатуры в каноническом вопросе о сигнатурах → «Как описать тип функции через сигнатуру, type или interface?» (ts-function-signatures).
- Выбор union, перегрузки или generic по реальной зависимости → «Как объявлять перегрузки функции и какую роль играет реализация?» (ts-function-overloads).
- Async callback в void-контексте без дублирования определения void → «Что означает void в результате функции и почему callback может вернуть значение?» (ts-void).
- Публикация const enum и отдельные трансформаторы без новой карточки о видах enum → «Для чего нужен enum и какие есть альтернативы?» (ts-enums).
- Извлечение this и ограничения generic/overload без отдельных дублей helpers → «Как извлечь параметры и результат функции либо конструктора?» (ts-signature-utilities).
- Практический смысл дополнительных строгих проверок вместо карточки на каждый флаг → «Чем strict в TypeScript отличается от выражения «строгая типизация»?» (ts-strict-mode).
- Module augmentation и declare global как разные области расширения → «Как расширять глобальные типы и объявления существующего модуля?» (ts-global-augmentation).
- Общие ключи union без отдельного вопроса, повторяющего keyof → «Что означает union и какие операции доступны до сужения?» (ts-union-types).
- Фиксированный параметр контейнера и generic-сигнатура на каждый вызов → «Как объявлять generic-типы и читать вложенные обобщения?» (ts-generic-containers).

## Почему близкие новые вопросы всё же разделены

- Совместимость callback и вариантность generic-контейнера проверяют разные решения: безопасную замену обработчика и роль T во всём контейнере. Определения контравариантности не превращены в отдельные карточки для каждого вида функции.
- As const и const-параметр типа различаются местом применения: аннотация вызова и проектирование вывода API. Базовый вопрос о литералах дополнен alias-ограничением, новый вопрос посвящён только const generics.
- Полиморфный this сохраняет подтип в fluent API; typestate ограничивает порядок операций. Возврат this сам по себе не решает вторую задачу.
- Promise и Awaited раскрыты в прежнем вопросе об async-функциях. Новый Result посвящён ожидаемым отказам как части бизнес-контракта, а не повторному определению union.
- Сигнатуры функций сохранены в прежней карточке. Новая обёртка проверяет сохранение этих зависимостей и границы работы с перегрузками и generic-функциями.
- Проверка формы JSON уже встречается в JavaScript. Здесь новый навык - связать тип результата generic API с реальным parser-контрактом; JavaScript-механика JSON.parse повторно не добавлена.
- Новые брендированные ID опираются на структурную типизацию, но проверяют прикладную границу создания доменного значения и его потерю при сериализации.
- DeepReadonly размещён в преобразованиях типов: он проверяет рекурсивное преобразование с заданной областью, а не повторяет описание дерева из вопроса о рекурсивных типах.

## Версии, примеры и границы

Контент опирается на документацию TypeScript. Версионные особенности указаны по месту: satisfies 4.9, const type parameters и современная модель декораторов 5.0, NoInfer и сохранение сужения в некоторых замыканиях 5.4, вывод предикатов и isolatedDeclarations 5.5. Для types учтено изменение значения по умолчанию в 6.0. Настройки приложения не менялись.

Примеры независимы друг от друга. Declare обозначает внешнюю реализацию, а не готовую исполняемую программу. Намеренно неверные строки закомментированы. JSON-конфигурации показаны как JSON в Markdown, а не выдаются за TypeScript-функции. Если результат зависит от strictNullChecks, strictFunctionTypes, noUncheckedIndexedAccess или exactOptionalPropertyTypes, условие указано в ответе или примере.

## Источники

- [Unknown на границе данных](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [Совместимость типов](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)
- [Variadic tuples, TypeScript 4.0](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html)
- [Объектные варианты](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [strictFunctionTypes](https://www.typescriptlang.org/tsconfig/strictFunctionTypes.html)
- [Контракты функций](https://www.typescriptlang.org/docs/handbook/2/functions.html)
- [Типизация генераторов, TypeScript 3.6](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-6.html)
- [Const-параметры, декораторы и импорты, TypeScript 5.0](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html)
- [Generics и вариантность](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [Сужение в замыканиях и NoInfer, TypeScript 5.4](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-4.html)
- [Template literal types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
- [Mapped types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [Классы](https://www.typescriptlang.org/docs/handbook/2/classes.html)
- [Satisfies, TypeScript 4.9](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html)
- [noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig/noUncheckedIndexedAccess.html)
- [Emit полей и declare, TypeScript 3.7](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html)
- [DOM-декларации](https://www.typescriptlang.org/docs/handbook/dom-manipulation.html)
- [Разрешение модулей и paths](https://www.typescriptlang.org/docs/handbook/modules/reference.html)
- [Declaration files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)
- [Публикация деклараций](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)
- [ESM/CJS interoperability](https://www.typescriptlang.org/docs/handbook/modules/appendices/esm-cjs-interop.html)
- [Вывод предикатов и isolatedDeclarations, TypeScript 5.5](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html)
- [Project references](https://www.typescriptlang.org/docs/handbook/project-references.html)
- [Автоматическое подключение types](https://www.typescriptlang.org/tsconfig/types.html)
- [Проверка JavaScript](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html)
- [skipLibCheck](https://www.typescriptlang.org/tsconfig/skipLibCheck.html)
- [Сужение и discriminated unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [Indexed access types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
- [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [Declaration merging и augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)
- [Корреляция при деструктуризации, TypeScript 4.6](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-6.html)
- [exactOptionalPropertyTypes](https://www.typescriptlang.org/tsconfig/exactOptionalPropertyTypes.html)
- [isolatedModules](https://www.typescriptlang.org/tsconfig/isolatedModules.html)
- [typeRoots](https://www.typescriptlang.org/tsconfig/typeRoots.html)

## Применение

Изменён только контент seed и этот отчёт. Сохранены все прежние ID, связи и отметки. Никакие существующие записи не удалены и не объединены между разными сохранёнными ID, миграция переноса прогресса не требуется. Seed выполняет upsert своих записей и сохраняет пользовательские вопросы.

Пользователь применяет обновление самостоятельно командой pnpm db:seed, затем перезагружает страницу для обновления клиентского каталога. Агент не запускал seed, миграции, Docker, сервер, сборку, lint, типизацию, тесты или код примеров. Выполнено редактирование и форматирование контента. Примеры сопоставлены с документацией и просмотрены в исходниках; выполнение и проверка конкретной версией компилятора остаются за пользователем.
