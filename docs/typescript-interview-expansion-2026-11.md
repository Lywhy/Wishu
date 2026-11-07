# Расширение TypeScript для подготовки

Дата: 2026-11-07. Было 99, стало 161. Добавлено 62 вопросов, расширено 17 канонических ответов. 11 кандидатов оставлены в уже существующих темах вместо повторных карточек. ID прежних вопросов сохранены.

## Матрица

Сложность: базовый / средний / продвинутый. Граница - язык TypeScript и его toolchain; runtime JavaScript и фреймворки связаны ссылками.

| Подраздел                            | Было | Стало | Сложность |
| ------------------------------------ | ---: | ----: | --------- |
| Основы TypeScript                    |    5 |     7 | 6 / 1 / 0 |
| Базовые и специальные типы           |    8 |    11 | 8 / 3 / 0 |
| Объектные типы и интерфейсы          |    7 |    10 | 6 / 4 / 0 |
| Массивы, кортежи и коллекции         |    6 |    12 | 5 / 6 / 1 |
| Типизация функций                    |    7 |    11 | 5 / 3 / 3 |
| Union и Intersection Types           |    2 |     3 | 1 / 1 / 1 |
| Сужение типов и Type Guards          |    5 |    10 | 4 / 4 / 2 |
| Дженерики                            |    8 |    11 | 4 / 6 / 1 |
| Операторы типов и преобразования     |    8 |    16 | 2 / 6 / 8 |
| Utility Types                        |    7 |     8 | 6 / 0 / 2 |
| Типизация классов и ООП              |    9 |    15 | 5 / 8 / 2 |
| Практики, ограничения и антипаттерны |    9 |    11 | 6 / 4 / 1 |
| Модули и сборка                      |   10 |    14 | 1 / 8 / 5 |
| Проектирование типобезопасных API    |    8 |    10 | 0 / 7 / 3 |
| Конфигурация и диагностика           |    0 |     8 | 1 / 6 / 1 |
| Декларации и библиотеки              |    0 |     4 | 0 / 3 / 1 |

## Новые вопросы

- ts-contextual-inference [Средний]: Как контекст вызова влияет на вывод типов callback?
- ts-type-value-spaces [Базовый]: Почему одно имя может обозначать и значение, и тип?
- ts-special-type-algebra [Средний]: Как any, unknown и never ведут себя в union и intersection?
- ts-unique-symbol-identity [Средний]: Как unique symbol создаёт различимые ключи и бренды?
- ts-property-key-domains [Средний]: Когда использовать PropertyKey и почему ключ объекта не всегда string?
- ts-weak-object-types [Средний]: Почему объект может не подходить типу, у которого все свойства optional?
- ts-spread-result-types [Средний]: Как порядок spread влияет на выведенный тип результирующего объекта?
- ts-template-index-signatures [Средний]: Как разрешить динамические свойства только с заданным префиксом?
- ts-tuple-shape-operations [Средний]: Как keyof, length и T[number] по-разному описывают кортеж?
- ts-empty-array-context [Средний]: Почему пустой массив внутри объекта может получить тип never[]?
- ts-array-alias-mutation [Продвинутый]: Почему совместимое присваивание массивов не гарантирует безопасность последующей мутации?
- ts-polymorphic-callback-contract [Продвинутый]: Чем generic-callback отличается от callback с заранее выбранным типом?
- ts-destructured-parameter-annotation [Базовый]: Где записывать тип деструктурируемого параметра функции?
- ts-generic-arrow-tsx [Средний]: Почему generic-стрелка в .tsx может быть разобрана как JSX?
- ts-strict-bind-call-apply [Средний]: Что проверяет strictBindCallApply при вызове call, apply и bind?
- ts-partial-type-argument-inference [Средний]: Можно ли явно задать один generic-параметр, а остальные оставить для произвольного вывода?
- ts-instantiation-expressions [Средний]: Что делает выражение makeBox<string> без вызова функции?
- ts-unused-generic-parameter [Средний]: Почему неиспользуемый generic-параметр не различает два контейнера?
- ts-inferred-predicates [Средний]: Когда filter выводит type predicate без явного value is T?
- ts-guard-false-branch [Продвинутый]: Почему предикат «это маленькое число» нельзя объявлять как value is number?
- ts-destructured-discriminant [Средний]: Когда деструктуризация discriminated union сохраняет связь между полями?
- ts-mutation-after-narrowing [Продвинутый]: Может ли вызов другой функции сделать ранее суженное свойство небезопасным?
- ts-unknown-array-elements [Средний]: Почему Array.isArray недостаточно для проверки массива строк из unknown?
- ts-keyof-union-keys [Продвинутый]: Почему keyof union возвращает общие ключи, а не все ключи вариантов?
- ts-union-of-functions [Продвинутый]: Почему union функций не равен функции с union-параметром?
- ts-tuple-pattern-infer [Средний]: Как извлечь голову и хвост кортежа через infer?
- ts-infer-multiple-candidates [Продвинутый]: Как позиции нескольких infer-кандидатов влияют на union или intersection результата?
- ts-homomorphic-tuples [Продвинутый]: Почему mapped type может сохранить кортеж, а явный remapping ключей - изменить форму результата?
- ts-record-to-correlated-union [Продвинутый]: Как из словаря типов получить union связанных пар ключ-значение?
- ts-filter-properties-by-type [Продвинутый]: Как выбрать свойства объекта по типу их значений?
- ts-template-number-inference [Продвинутый]: Как infer с ограничением извлекает число из строкового литерала?
- ts-recursive-type-budget [Продвинутый]: Как ограничить рекурсивный тип и избежать чрезмерной глубины вычисления?
- ts-distributive-omit [Продвинутый]: Почему Omit над union может потерять поля отдельных вариантов?
- ts-constructor-instance-sides [Средний]: Чем тип экземпляра класса отличается от typeof Class?
- ts-static-generic-state [Средний]: Почему static-поле generic-класса не может принадлежать отдельному T?
- ts-this-based-guards [Средний]: Как метод с this is уточняет состояние экземпляра?
- ts-mixin-constructor-contract [Продвинутый]: Как типизируется mixin как функция над конструктором?
- ts-correlated-property-write [Средний]: Как сохранить связь ключа и значения при обновлении свойства?
- ts-json-data-contract [Средний]: Как описать JSON-данные типом и какие ограничения такой тип не проверит?
- ts-type-contract-tests [Средний]: Как проверять типовой контракт отдельно от runtime-тестов?
- ts-project-file-graph [Средний]: Чем files, include и exclude отличаются от rootDir и outDir?
- ts-config-inheritance-paths [Средний]: Как наследование tsconfig влияет на относительные пути и массивы настроек?
- ts-check-emit-boundary [Базовый]: Чем noEmit отличается от noEmitOnError и успешной сборки бандлера?
- ts-cli-project-selection [Средний]: Почему tsc file.ts не равен проверке проекта через tsc -p?
- ts-erasable-syntax-boundary [Средний]: Что проверяет erasableSyntaxOnly и чего не делает простое удаление типов?
- ts-config-diagnostic-tools [Средний]: Как найти причину неожиданного импорта, глобального типа или состава проекта?
- ts-source-declaration-maps [Средний]: Чем sourceMap отличается от declarationMap?
- ts-checker-performance-diagnosis [Продвинутый]: Как отличить медленную проверку типов от медленной сборки или работы программы?
- ts-module-detection-scope [Средний]: Почему два файла без импортов могут конфликтовать по глобальным именам?
- ts-side-effect-import-check [Средний]: Что проверяет noUncheckedSideEffectImports и как типизировать импорт CSS?
- ts-json-import-boundary [Средний]: Что даёт resolveJsonModule и почему этого недостаточно для любого runtime-импорта JSON?
- ts-package-conditional-types [Продвинутый]: Как exports и условия types влияют на выбор деклараций пакета?
- ts-library-consumer-check [Средний]: Как проверить библиотеку как отдельный потребитель?
- ts-function-namespace-merging [Средний]: Как declaration merging связывает функцию и namespace с дополнительными членами?
- ts-read-nested-diagnostics [Базовый]: Как разбирать длинное сообщение о несовместимости типов?
- ts-array-union-shapes [Базовый]: Чем (A | B)[] отличается от A[] | B[]?
- ts-accessor-read-write-types [Средний]: Могут ли getter и setter описывать разные типы чтения и записи?
- ts-private-constructor-factory [Средний]: Зачем закрывать конструктор private и предоставлять статическую фабрику?
- ts-iterator-result-check [Средний]: Почему перед использованием iterator.next().value важно проверить done?
- ts-promise-all-tuples [Средний]: Как сохранить разные типы результатов Promise.all по позициям?
- ts-shorthand-ambient-any [Средний]: Почему короткое declare module может убрать ошибку импорта, но открыть путь any?
- ts-merging-overload-contract [Продвинутый]: Как объединение деклараций влияет на набор перегрузок публичного API?

## Расширенные канонические вопросы

- ts-literal-types: Const привязки и литеральность свойства.
- ts-template-literal-patterns: Число комбинаций.
- ts-structural-typing: Данные на границе API.
- ts-index-signature: Метаданные рядом со словарём.
- ts-function-parameters: Callback вправе игнорировать аргумент.
- ts-function-variance: Синтаксис обработчика является частью проверки.
- ts-distributive-never: Особые аргументы условного типа.
- ts-signature-utilities: Извлечение не сохраняет универсальность.
- ts-object-utilities: Readonly<Map> и ReadonlyMap.
- ts-satisfies: Проверка не добавляет необязательное свойство.
- ts-class-visibility: Происхождение private-членов.
- ts-global-augmentation: Если после добавления .d.ts исчезли экспорты.
- ts-library-declaration-publishing: Внутренние пути в публичной декларации.
- ts-esm-cjs-contract: Версия компилятора и формат .d.ts.
- ts-ambient-types-scope: Не полагаться на defaults другой версии.
- ts-async-functions: Однослойное извлечение и Awaited.
- ts-config: Настройки и гарантии среды.

## Пересечения

- ts-object-exactness-boundary -> ts-structural-typing
- ts-index-signature-named-fields -> ts-index-signature
- ts-generic-parameter-inference-positions -> ts-no-infer
- ts-declaration-module-flavors -> ts-esm-cjs-contract
- ts-declaration-private-paths -> ts-library-declaration-publishing
- ts-augmentation-vs-shadowing -> ts-global-augmentation
- ts-lib-runtime-version -> ts-config
- ts-awaited-contract -> ts-async-functions
- ts-widening-object-properties -> ts-literal-types
- ts-callable-constructable-contract -> ts-function-signatures
- ts-template-union-expansion -> ts-template-literal-patterns

Формулировки проверялись по навыкам и ожидаемому объяснению. Новые вопросы о применении не заменяют определения; связаны с основами. В частности, Promise/JSON runtime остаётся в JavaScript, а типовые проекции и границы контрактов - в TypeScript.

## Источники и версии

Источники записаны в библиотеки подразделов и sourceRefs. Основа: TypeScript Handbook, TSConfig Reference и release notes. Версионные случаи включают TS 4.6 (деструктурированные union), 4.7 (instantiation expressions), 4.8 (constrained infer), 5.5 (вывод предикатов), 5.6 (iterator return), 5.8 (стираемый синтаксис), 6.0 (изменение defaults и запуска с явными файлами).

Примеры иллюстрируют заявленные настройки и современные объявления API. Checker, сборка приложения и примеры не запускались. Ручное рассуждение не обозначается как выполненный type-test. Прошлые конфиги interop нельзя считать универсальными для новых версий.

## Планы и проверка

Планы: content/batches/ts-20261107-*.json. Принятые решения: content/decisions.json. Сначала зафиксированы цели и пересечения, затем подготовлены Markdown и примеры. Готовность отдельной новой цели не доказывает полноту любого будущего собеседования. Статус полного аудита старых imported-ответов не повышался автоматически.

Контентные проверки выполняются после форматирования и сборки. Контентная сборка и полная content:check прошли: 781 вопрос во всём каталоге. Для TypeScript отчёт зафиксировал +62 новых, 17 изменённых, 0 удалённых ID и 0 TODO. Проверен TSX-fence, сохраняющий значимую запятую generic-стрелки. В примере плотного массива используется parser с отдельным результатом, без чрезмерного type predicate. PostgreSQL seed применяет пользователь.
