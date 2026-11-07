# Расширение HTML/CSS и React

## Результат

| Раздел     | Было | Добавлено | Дополнено существующих | Стало |
| ---------- | ---: | --------: | ---------------------: | ----: |
| HTML и CSS |   12 |        36 |                     10 |    48 |
| React      |   54 |        16 |                     18 |    70 |

Дополнены два канонических вопроса Next.js о Server Actions и RSC-сериализации вместо создания их повторов в React. Все ранее существовавшие ID и расположение сохранены. В HTML/CSS добавлены подразделы «Формы и ввод данных», «Ресурсы и встраивание», «Визуальные состояния и анимации». React использует прежние подразделы.

## Основание отбора

HTML/CSS был представлен только двенадцатью основными вопросами: заметно не хватало форм, фокуса, нативных диалогов, семантики таблиц, intrinsic sizing, positioning, управления ресурсами и движения. В React уже были основы состояния, эффектов, refs, Context, форм, мемоизации и SSR. Их определения не создавались заново. Новые карточки проверяют отдельные прикладные навыки: владение DOM, конфликт draft, входные композиции, request isolation и область серверного кеша.

## Добавленные вопросы

### HTML и CSS

#### Семантика и доступность

- html-doctype-mode: Зачем нужен <!doctype html> и что меняет quirks mode?
- html-parser-content-model: Почему DOM может отличаться от написанной HTML-разметки?
- html-accessible-name: Чем доступное имя элемента отличается от роли и описания?
- html-focus-order: Как управлять фокусом, не нарушая естественный порядок Tab?
- html-hiding-contract: Чем различаются display: none, visibility, opacity, aria-hidden и inert?
- html-native-dialog: Чем showModal() у dialog отличается от простого показа блока?
- html-table-relations: Как сделать таблицу данных понятной без визуального расположения ячеек?
- html-live-status: Как сообщать об изменении статуса без неожиданного перемещения фокуса?

#### Каскад и блочная модель

- css-selector-functions: Как :is(), :where(), :not() и :has() влияют на выбор элементов и специфичность?
- css-custom-properties: Как CSS custom properties наследуются и когда срабатывает fallback у var()?
- css-content-visibility: Что даёт content-visibility: auto и чем оно отличается от виртуализации?
- css-progressive-enhancement: Как использовать @supports и улучшать интерфейс без поломки базового варианта?

#### Построение макета

- css-margin-collapse-bfc: Когда вертикальные margin схлопываются и как помогает новый formatting context?
- css-display-formatting: Чем block, inline и inline-block отличаются в потоке документа?
- css-intrinsic-sizing: Что означают min-content, max-content и fit-content?
- css-containing-block: Относительно чего позиционируются absolute и fixed?
- css-sticky-constraints: Почему position: sticky иногда не прилипает?
- css-flex-space: Как flex-basis, flex-grow и flex-shrink распределяют место?
- css-grid-tracks: Как repeat, minmax и auto-fit помогают строить адаптивную Grid-сетку?
- css-subgrid-contract: Когда subgrid полезнее независимой вложенной сетки?
- css-box-alignment: Чем align-items, align-content и justify-content отличаются?
- css-overflow-scroll-contract: Чем overflow: hidden отличается от clip, auto и scroll?

#### Адаптивность

- css-logical-properties: Зачем использовать logical properties вместо left, right, width и height?
- css-image-fitting: Как aspect-ratio и object-fit решают разные задачи изображения?
- css-fluid-type: Как сделать плавный размер текста через clamp и сохранить читаемость?
- css-text-wrapping: Как выбрать между переносом длинного слова и визуальным обрезанием текста?
- css-font-loading: Как загрузка веб-шрифта влияет на текст и сдвиги макета?

#### Формы и ввод данных

- html-form-entry-list: Какие поля попадают в данные формы и почему disabled отличается от readonly?
- html-native-validation: Что проверяет встроенная валидация формы и где нужны собственные проверки?
- html-input-hints: Чем различаются type, inputmode и autocomplete у поля?

#### Ресурсы и встраивание

- html-iframe-boundary: Как определить границу доверия для iframe?
- html-resource-hints: Когда использовать preload, prefetch и preconnect?

#### Визуальные состояния и анимации

- css-transition-animation: Когда использовать transition, а когда animation?
- css-reduced-motion: Как учитывать prefers-reduced-motion без потери смысла интерфейса?
- css-focus-indicator: Как оформить focus-visible и не потерять клавиатурную доступность?
- css-color-preferences: Как согласовать тёмную тему, системное предпочтение и forced colors?

### React

#### Компоненты и рендеринг

- react-composition-patterns: Как выбрать между children, render prop, HOC и пользовательским хуком?
- react-children-opaque: Почему children нельзя считать обычным массивом готовых DOM-узлов?
- react-event-boundaries: Как распространение React-событий связано с DOM и обработчиками capture?
- react-activity-lifetime: Как Activity скрывает интерфейс с сохранением состояния и что происходит с эффектами?

#### Состояние и поток данных

- react-normalized-state: Когда сущности в состоянии лучше хранить по ID, а не копировать в разные ветви?
- react-draft-conflicts: Как сохранить пользовательский черновик при обновлении данных с сервера?

#### Хуки и эффекты

- react-effect-events: Когда useEffectEvent позволяет прочитать актуальное значение без пересоздания подписки?

#### Refs и работа с DOM

- react-callback-ref-cleanup: Как callback ref помогает учитывать динамические DOM-узлы и очищать связанные ресурсы?
- react-widget-dom-ownership: Как встроить сторонний редактор или карту, не конфликтуя с управлением DOM у React?

#### Context и управление состоянием

- react-url-state: Какие состояния интерфейса стоит хранить в URL и как избежать второго источника истины?
- react-ssr-state-isolation: Почему пользовательское состояние SSR нельзя бездумно хранить в singleton-store модуля?

#### Формы и пользовательский ввод

- react-input-composition: Почему форматирование управляемого поля может ломать каретку и IME-ввод?

#### Производительность

- react-flush-sync: Когда flushSync оправдан при интеграции с браузерным или сторонним API?

#### Асинхронный интерфейс

- react-data-waterfalls: Почему загрузка данных в дочерних эффектах может создавать waterfall?

#### Серверный рендеринг и React 19

- react-server-cache: Чем cache в Server Components отличается от useMemo и постоянного серверного кеша?

#### Ошибки и тестирование

- react-test-browser-boundary: Почему компонентный тест в jsdom не доказывает корректность layout и реального фокуса?

## Что объединено с существующим материалом

Это кандидаты на отдельные новые вопросы, включённые в существующие ответы без новых ID:

- Иерархия заголовков и повторяющиеся landmarks → «Зачем нужны main, nav, header и section?» (html-landmarks, html-css).
- Группы полей, fieldset/legend и постоянные инструкции → «Почему placeholder не заменяет label у поля?» (html-form-label, html-css).
- Cascade layers и порядок important вместо новых карточек на каждый приоритет → «Как браузер выбирает правило при конфликте CSS?» (css-cascade, html-css).
- Unset, revert и revert-layer в едином вопросе о восстановлении значения → «Какие CSS-свойства наследуются и что делают inherit и initial?» (css-inheritance, html-css).
- Квадратные размеры, min/max и проценты без повторения определения модели → «Чем content-box отличается от border-box?» (css-box-sizing, html-css).
- Та же причина переполнения по block-оси и у Grid → «Почему flex-элемент не сжимается и ломает макет?» (css-flex-min-size, html-css).
- Top layer и isolation без повторного вопроса только о z-index → «Почему большой z-index не поднимает элемент над соседним блоком?» (css-position-stacking, html-css).
- Тип контейнера и невозможность запроса собственного размера для себя → «Чем media query отличается от container query?» (css-media-container, html-css).
- Svh/lvh/dvh, safe area и масштабирование → «Чем rem, em, проценты и viewport-единицы отличаются?» (css-relative-units, html-css).
- Picture, art direction и отличия от простого выбора разрешения → «Для чего нужны srcset, sizes и размеры изображения?» (html-responsive-images, html-css).
- Черновики по сущностям и remount без нового вопроса об идентичности → «Когда React сохраняет состояние, а когда сбрасывает его?» (react-state-identity, react).
- Batching и границы очереди без повторной карточки о setState → «Что выведут три вызова setCount и когда нужен updater?» (react-state-queue, react).
- Выбор updater, зависимостей, ref или Effect Event по причине устаревания → «Что такое устаревшее замыкание в React?» (react-stale-closures, react).
- Объектные зависимости и независимые процессы синхронизации → «Чем отличаются useEffect без массива, с [] и с зависимостями?» (react-effect-dependencies, react).
- Публичный контракт хука и скрытые зависимости → «Что переиспользует пользовательский хук: состояние или логику?» (react-custom-hooks, react).
- Стабильность snapshot, subscribe и SSR-снимка → «Для чего предназначен useSyncExternalStore?» (react-external-store, react).
- UseId и граница между доступной связью и идентичностью записи → «Как связать label и сообщение об ошибке с полем?» (react-accessible-fields, react).
- DefaultValue, file input и одностороннее владение → «Чем управляемое поле отличается от неуправляемого?» (react-controlled-input, react).
- Function action и сброс неуправляемых полей → «Как обработать отправку формы и получить её данные?» (react-form-submit, react).
- Ожидаемые ошибки, исключения и сохранение значения при неудаче → «Как useActionState помогает обрабатывать форму в React 19?» (react-action-state, react).
- Await внутри transition и граница срочности управляемого ввода → «Чем useTransition отличается от useDeferredValue?» (react-transition-deferred, react).
- Стабильный optimistic ID, откат и порядок подтверждений → «Как организовать оптимистичное обновление через useOptimistic?» (react-optimistic-ui, react).
- Идентичность первого снимка и недопустимая HTML-вложенность → «Что такое гидратация и почему возникает hydration mismatch?» (react-hydration, react).
- Восстановление после ошибки без новой карточки о границах → «Какие ошибки ловит Error Boundary и какие остаются снаружи?» (react-error-boundary, react).
- Фокус и state виртуализированных строк → «Когда нужна виртуализация длинного списка?» (react-list-windowing, react).
- Доверие к аргументам Server Function → «Почему Server Action требует проверки прав, даже если кнопка скрыта?» (next-server-actions, nextjs).
- Поддерживаемые значения протокола RSC → «Какие данные можно передать из Server Component в Client Component?» (next-props-serialization, nextjs).
- Потоковый SSR, shell и поздние ошибки → «Чем CSR отличается от SSR и статического рендеринга?» (react-csr-ssr, react).
- Размещение границ ожидания без отдельного определения Suspense → «Как работают lazy и Suspense и что они не отслеживают?» (react-lazy-suspense, react).
- Переход к каноническому вопросу о передаче серверных значений → «Чем Server Components отличаются от SSR и Client Components?» (react-server-components, react).

Четыре подготовленных кандидата не опубликованы как отдельные карточки:

- react-server-function-trust → next-server-actions: Доверие к аргументам Server Function.
- react-rsc-serialization → next-props-serialization: Поддерживаемые значения протокола RSC.
- react-streaming-ssr → react-csr-ssr: Потоковый SSR, shell и поздние ошибки.
- react-suspense-placement → react-lazy-suspense: Размещение границ ожидания без отдельного определения Suspense.

## Связанные, но разные цели

- Доступное имя не повторяет label: оно отличает имя, роль и описание для разных элементов. Label/fieldset остаются в своём каноническом ответе.
- Containing block не равен stacking context: один вопрос про координаты, другой про наложение.
- Flex sizing объясняет распределение места, старый min-size объясняет конкретную причину отказа сжатия. Та же причина по вертикали расширена в старом ответе.
- Object-fit не повторяет srcset: первый управляет отображением в коробке, второй выбором сетевого ресурса. Picture добавлен к существующему вопросу о responsive images.
- Native dialog объясняет платформенную модальность; React Portal по-прежнему отвечает за место DOM при сохранении React-дерева.
- CSS content-visibility, React Activity и виртуализация имеют разные области: отложенная отрисовка браузера, сохранённое поддерево с управлением Effects, уменьшение числа смонтированных элементов. В ответах это явно разделено.
- React cache описывает API и область RSC-запроса; политика кеша конкретного Next.js fetch остаётся в Next.js. Сериализация и контроль прав уже были раскрыты там по тем же учебным целям и не дублируются.
- Waterfall запросов отделён от гонки ответов: один вопрос проверяет порядок запуска, другой - актуальность записи результата.
- Testing Library и общие уровни тестов не определяются повторно: новый вопрос посвящён отсутствующей в jsdom реализации layout.

## Формат и отображение

Новые ответы содержат короткую выжимку, детали, пример там, где он помогает, главную мысль, типичную ошибку и ссылку на первичную документацию. CSS-классы встречаются только в учебных примерах, не в стилях приложения. Реальный интерфейс продолжает использовать Tailwind и существующие компоненты.

Уточнён выбор языка подсветки: HTML/CSS-примеры получают подходящую грамматику; явно указанный поддерживаемый язык fenced Markdown имеет приоритет над названием темы. Это также корректно показывает JSON внутри TypeScript-ответов. Используются уже установленные Shiki-языки, новых пакетов нет.

Activity и useEffectEvent отмечены как API React 19.2+; основная сверка выполнена по текущей документации React 19.3. Серверные примеры требуют поддерживающей RSC/SSR-среды и не выдаются за возможности обычного Vite SPA. Для CSS не обещана универсальная поддержка любой версии браузера.

## Источники

- [Режим документа](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Quirks_mode_and_standards_mode)
- [Модель содержимого p](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/p)
- [Доступное имя](https://developer.mozilla.org/en-US/docs/Glossary/Accessible_name)
- [Клавиатурный фокус](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex)
- [Скрытие от accessibility API](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden)
- [Нативный dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)
- [Табличные данные](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/table)
- [Динамические объявления](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions)
- [Данные формы](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData)
- [Нативная валидация](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation)
- [Назначение и поведение input](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input)
- [Граница iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe)
- [Ресурсные подсказки](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preload)
- [Специфичность селекторов](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Specificity)
- [Custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties)
- [Схлопывание margin](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing)
- [Display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
- [Intrinsic sizing](https://developer.mozilla.org/en-US/docs/Glossary/Intrinsic_Size)
- [Позиционирование](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position)
- [Распределение flex-размеров](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Controlling_ratios_of_flex_items_along_the_main_axis)
- [Grid-треки](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout)
- [Subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Subgrid)
- [Box alignment](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_alignment/Box_alignment_in_flexbox)
- [Overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow)
- [Logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values)
- [Object fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
- [Плавные ограниченные значения](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp)
- [Перенос текста](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap)
- [Загрузка шрифтов](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display)
- [CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations)
- [Reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
- [Focus visible](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)
- [Color scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme)
- [Content visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/content-visibility)
- [Feature queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@supports)
- [Композиция и явные props](https://react.dev/learn/passing-props-to-a-component)
- [Непрозрачная структура children](https://react.dev/reference/react/Children)
- [События и callback refs](https://react.dev/reference/react-dom/components/common)
- [Activity](https://react.dev/reference/react/Activity)
- [Структура состояния](https://react.dev/learn/choosing-the-state-structure)
- [Причины не использовать эффект](https://react.dev/learn/you-might-not-need-an-effect)
- [UseEffectEvent](https://react.dev/reference/react/useEffectEvent)
- [Внешняя синхронизация и загрузка](https://react.dev/reference/react/useEffect)
- [Управляемый ввод](https://react.dev/reference/react-dom/components/input)
- [Границы Suspense](https://react.dev/reference/react/Suspense)
- [FlushSync](https://react.dev/reference/react-dom/flushSync)
- [Кеш RSC](https://react.dev/reference/react/cache)
- [Server Functions](https://react.dev/reference/rsc/use-server)
- [Потоковый SSR](https://react.dev/reference/react-dom/server/renderToPipeableStream)
- [Граница Client Components](https://react.dev/reference/rsc/use-client)
- [SSR и внешний store](https://react.dev/reference/react/useSyncExternalStore)
- [Ограничения jsdom](https://github.com/jsdom/jsdom#unimplemented-parts-of-the-web-platform)
- [React: async Transition](https://react.dev/reference/react/useTransition)
- [React Router 7: URL-параметры](https://reactrouter.com/7.18.5/api/hooks/useSearchParams)
- [MDN: inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert)

## Применение и ручная проверка

Пользователь применяет контент командой pnpm db:seed и перезагружает страницу, чтобы обновить клиентский кеш каталога. Миграция не нужна: изменяется seed, который обновляет свои записи по ID и не удаляет пользовательские вопросы.

Агент не запускал приложение, сервер, Docker, seed, миграции, сборку, компилятор, lint, тесты, HTML/CSS-примеры или React-компоненты. Выполнены правки исходников и форматирование. Пользователю стоит проверить появление разделов, Markdown-таблицы, HTML/CSS/JSX/JSON-подсветку, сохранность отметок и ссылки между React и Next.js. Примеры самостоятельны, требуют указанного окружения и не являются одной общей исполняемой программой.
