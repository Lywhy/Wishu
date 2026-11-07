# Расширение HTML и CSS

Дата: 2026-11-07. Было 48, стало 112. Добавлено 64, расширено 8 канонических ответов. 12 близких кандидатов оставлены в действующих вопросах вместо повторных карточек. Исходные ID и порядок прежних вопросов сохранены.

## Покрытие

Три новых подраздела: HTML-документ и текст, Селекторы и область действия, Текст и типографика. Новые ответы содержат короткий вывод, механизм и границы, пример, типичную ошибку и главную мысль. Связанные темы доступны по ссылкам.

Сложность в таблице: базовый / средний / продвинутый.

| Подраздел                       | Было | Стало | Сложность  |
| ------------------------------- | ---: | ----: | ---------- |
| Семантика и доступность         |   11 |    16 | 7 / 9 / 0  |
| Каскад и блочная модель         |    7 |    13 | 2 / 8 / 3  |
| Построение макета               |   13 |    21 | 2 / 17 / 2 |
| Адаптивность                    |    8 |    13 | 1 / 11 / 1 |
| Формы и ввод данных             |    3 |    10 | 2 / 8 / 0  |
| Ресурсы и встраивание           |    2 |     7 | 0 / 5 / 2  |
| Визуальные состояния и анимации |    4 |    11 | 1 / 9 / 1  |
| HTML-документ и текст           |    0 |     8 | 6 / 2 / 0  |
| Селекторы и область действия    |    0 |     7 | 3 / 2 / 2  |
| Текст и типографика             |    0 |     6 | 2 / 4 / 0  |

## Новые вопросы

- html-language-direction [Базовый]: Для чего нужны lang, dir и bdi в HTML?
- html-encoding-contract [Средний]: Как браузер определяет кодировку HTML и где размещать meta charset?
- html-boolean-enumerated-attributes [Базовый]: Почему disabled="false" всё равно отключает поле?
- html-void-replaced-elements [Базовый]: Чем пустые HTML-элементы отличаются от замещаемых?
- html-character-references [Базовый]: Когда в HTML нужны &lt;, &amp; и другие ссылки на символы?
- html-text-semantics [Базовый]: Как выбрать между strong, em, b, i и обычным span?
- html-list-description-contract [Базовый]: Когда использовать ul, ol и dl вместо набора div?
- html-base-url [Средний]: Как base влияет на относительные URL и ссылки с #fragment?
- html-article-section-aside [Базовый]: Чем article, section и aside отличаются по смыслу?
- html-native-disclosure [Средний]: Когда details и summary заменяют собственный компонент раскрытия?
- html-popover-contract [Средний]: Чем popover отличается от модального dialog?
- html-aria-state-behavior [Средний]: Почему aria-disabled и aria-expanded не реализуют поведение компонента?
- html-progress-meter-output [Базовый]: Когда выбирать progress, meter и output?
- html-native-submit-contract [Средний]: Как action, method, enctype и submit-кнопка определяют отправку формы?
- html-fieldset-radio-group [Базовый]: Как сгруппировать radio-кнопки и зачем нужны fieldset и legend?
- html-select-options [Базовый]: Как работают value, selected, multiple и optgroup у select?
- html-file-input-contract [Средний]: Что реально ограничивают accept и multiple у input type="file"?
- html-numeric-step-validity [Средний]: Почему допустимое число может нарушать step и почему maxlength не ограничивает number?
- html-contenteditable-contract [Средний]: Почему contenteditable не является полноценной заменой textarea?
- html-form-error-experience [Средний]: Как связать ошибку формы с полем и когда использовать aria-invalid?
- html-link-target-rel [Средний]: Чем noopener отличается от noreferrer у внешней ссылки?
- html-media-tracks-autoplay [Средний]: Как встроить видео с субтитрами и почему autoplay может не сработать?
- html-template-inert-content [Средний]: Зачем нужен template и чем он отличается от скрытого div?
- html-stylesheet-render-blocking [Продвинутый]: Может ли CSS задержать выполнение script и событие DOMContentLoaded?
- html-subresource-integrity [Продвинутый]: Что проверяет integrity у внешнего ресурса и зачем рядом crossorigin?
- css-size-constraints [Базовый]: Как width, min-width и max-width разрешают конфликт размеров?
- css-value-processing [Продвинутый]: Чем specified, computed, used и actual values отличаются друг от друга?
- css-shorthand-reset [Средний]: Почему shorthand может сбросить свойство, которого в нём явно нет?
- css-error-recovery [Средний]: Как браузер обрабатывает неизвестное свойство, неверное значение и ошибку в селекторе?
- css-registered-property [Продвинутый]: Что меняет регистрация custom property через @property?
- css-reset-normalize [Средний]: Чем reset отличается от normalize и почему опасно сбрасывать всё через all?
- css-combinator-contract [Базовый]: Чем отличаются пробел, >, + и ~ в CSS-селекторах?
- css-structural-counting [Средний]: Чем nth-child отличается от nth-of-type и как работает of S?
- css-pseudo-element-content [Базовый]: Чем псевдоэлемент отличается от псевдокласса и можно ли хранить смысл в ::before?
- css-attribute-selector-tokens [Базовый]: Чем [attr], [attr="x"], [attr~="x"] и [attr*="x"] отличаются?
- css-native-nesting-contract [Продвинутый]: Чем нативная CSS-вложенность отличается от простого склеивания селекторов?
- css-scope-boundary [Продвинутый]: Что ограничивает @scope и когда учитывается scoping proximity?
- css-state-focus-within [Средний]: Как связаны hover, active, focus и focus-within?
- css-grid-implicit-placement [Средний]: Чем явная Grid-сетка отличается от неявной и что делает grid-auto-flow: dense?
- css-grid-areas-overlap [Средний]: Как работают grid-template-areas и наложение элементов в одной ячейке?
- css-flex-wrapping-lines [Средний]: Почему строки flex-wrap не образуют общие колонки?
- css-auto-margin-gap [Средний]: Как auto margin во Flexbox взаимодействует с gap и justify-content?
- css-percentage-height [Средний]: Почему height: 100% не растягивает блок по высоте родителя?
- css-transform-flow-geometry [Средний]: Чем transform: translate отличается от изменения margin или позиции?
- css-display-contents-contract [Продвинутый]: Что убирает display: contents и почему с ним осторожны на семантических элементах?
- css-table-layout [Средний]: Когда table-layout: fixed полезнее auto и почему он не решает перенос текста?
- css-calc-typed-math [Средний]: Что вычисляет calc и почему нельзя складывать любые CSS-значения?
- css-media-query-logic [Средний]: Как работают and, запятая, not и диапазоны в media queries?
- css-container-query-setup [Продвинутый]: Почему size container query не срабатывает на том элементе, где задан container-type?
- css-print-fragmentation [Средний]: Как подготовить страницу к печати и что гарантирует break-inside: avoid?
- css-scroll-offset-snap [Средний]: Зачем нужны scroll-padding, scroll-margin и scroll-snap-type?
- css-line-height-inheritance [Средний]: Почему line-height: 1.5 часто лучше наследуется, чем 150% или 24px?
- css-white-space-contract [Базовый]: Чем normal, nowrap, pre и pre-wrap отличаются в white-space?
- css-baseline-inline-image [Базовый]: Откуда берётся зазор под img и почему vertical-align не центрирует любой блок?
- css-font-fallback-glyphs [Средний]: Как браузер выбирает шрифт из font-family и почему строка может использовать несколько шрифтов?
- css-variable-font-contract [Средний]: Как variable font связан с font-weight и когда нужен font-variation-settings?
- css-text-decoration-contract [Средний]: Почему text-decoration: none у потомка не всегда убирает подчёркивание предка?
- css-background-layers [Базовый]: Как работают несколько background и чем cover отличается от contain?
- css-opacity-alpha [Средний]: Чем opacity у контейнера отличается от прозрачности background-color?
- css-color-space-contrast [Средний]: Что дают oklch и color-mix и гарантируют ли они доступный контраст?
- css-pointer-events-contract [Средний]: Почему pointer-events: none не отключает кнопку полностью?
- css-animation-fill-timing [Средний]: Что определяют animation-delay, direction и fill-mode?
- css-entry-starting-style [Продвинутый]: Зачем нужен @starting-style при появлении нового элемента?
- css-scrollbar-gutter [Средний]: Как scrollbar-gutter уменьшает сдвиг макета при появлении прокрутки?

## Уточнения действующих ответов

- css-cascade: Специфичность сравнивают по разрядам.
- css-inheritance: Почему unset не возвращает браузерное оформление кнопки.
- css-custom-properties: Fallback не является проверкой типа подставленной строки.
- html-native-validation: Проверка, отправка и выбранная кнопка.
- html-responsive-images: Плотность и ширина - разные схемы srcset.
- html-resource-hints: Fetchpriority не заменяет preload и loading.
- html-parser-content-model: Проверка исходника до исправления hydration.
- css-relative-units: У процента нет одной универсальной базы.

## Редакторские объединения

- Новый вопрос про requestSubmit и submit -> html-native-validation. Уже описано различие сценариев проверки; добавлен пример вызова и границы.
- Новый вопрос про srcset 1x/2x и w -> html-responsive-images. Это продолжение единого выбора ресурса; не разделять на похожие карточки.
- Новый вопрос про fetchpriority и preload -> html-resource-hints. Единая задача планирования загрузки; дополнен канонический ответ.
- Новый вопрос про unset, revert и revert-layer -> css-inheritance. Базовые различия уже раскрыты; добавлен конкретный пример с UA-рамкой.
- Новый вопрос про fallback var() -> css-custom-properties. Существующая цель уже включает invalid at computed-value time; добавлен контрпример.
- Новый вопрос про сравнение специфичности -> css-cascade. Частный шаг общего алгоритма каскада; дополнен расчёт.
- Новый вопрос про исправление p браузером -> html-parser-content-model. В каноническом ответе есть парсер и hydration; добавлен корректный вариант.
- Новый вопрос про базу процентного padding -> css-relative-units. Уточнение существующей модели относительных единиц.
- Повторное определение auto-fit и auto-fill -> css-grid-tracks. Уже есть прямое сравнение и пределы minmax; повтор не создан.
- Новый вопрос про положительный tabindex -> html-focus-order. Правило уже объяснено вместе с DOM-порядком и roving tabindex.
- Копия инструкции async/defer -> script-loading. Оставлена в JavaScript; новый вопрос рассматривает зависимость от CSS, не повторяет типы загрузки.
- Повторное объяснение title и иерархии заголовков для SEO -> seo-headings. Основная SEO-цель остаётся в SEO; HTML-семантика связана с существующими landmark-вопросами.

Ни один ранее опубликованный ID не объединён и не удалён: объединялись только новые кандидаты до создания карточки. Модель DOM, события, script-loading и сеть остаются в соседних разделах; SEO-иерархия заголовков не копируется в HTML. Новые applied-вопросы рассматривают отличающиеся навыки и связаны с основами.

## Источники и оговорки

Реестр: content/references/sources.json. Используются MDN, WHATWG HTML и спецификации W3C. Современные возможности разобраны с ограничениями среды: Popover, name-группы details, @scope, @property, nesting, @starting-style и scrollbar-gutter. Не заявляется универсальная поддержка всех частей. Источники без отдельной полной проверки даты оставлены с checkedAt: null.

Примеры являются учебными фрагментами; приложение, браузер, компилятор и код примеров не запускались. SRI-пример явно обозначен как схема с заменяемым хешем. Ручной разбор не выдаётся за выполненный тест. Старые imported-ответы и обзорные цели не повышены автоматически до полного аудита. Число вопросов не гарантирует покрытие любого собеседования.

## Проверки

Oxfmt применён только к затронутым исходникам. Content:build и полная content:check прошли: 845 вопросов, структура, связи и пять сгенерированных артефактов согласованы. Дополнительно проверены сохранность 48 прежних ID, отсутствие удалённых вопросов и Markdown-разделитель каждого нового ответа. Приложение и примеры не запускались. Для загрузки контента в PostgreSQL пользователь выполняет pnpm db:seed.
