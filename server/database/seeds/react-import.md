# React: структура и подборка вопросов

Подборка подготовлена самостоятельно по запросу пользователя. Добавлено 52 новых вопроса; всего 54 вопроса в 10 подразделах. Создано 8 подразделов, два прежних сохранены по ID. У каждого нового вопроса есть описание, содержательный ответ, уровень и главная мысль; примеры включены там, где показывают конкретное поведение.

Существующие ID react-keys и effects, их ответы и привязка к подразделам сохранены. Изменён только порядок внутри подраздела. Удалений и объединения сохранённых ID нет; прогресс и избранное не переносятся и не сбрасываются. Новые вопросы не помечены популярными автоматически: popular остаётся false до отдельного редакционного выбора.

## Разделение учебных целей

- Определение замыкания уже есть в JavaScript. В React добавлен отдельный прикладной вопрос про устаревшее замыкание и снимок рендера.
- Иммутабельность из JavaScript не копируется: вопрос React объясняет обновление state и ссылки по изменённому пути.
- Существующий вопрос про key остаётся про идентичность списка. Новый вопрос про сброс состояния рассматривает тип компонента, позицию и намеренный сброс по key.
- Существующий вопрос effects отвечает за назначение эффекта и cleanup. Зависимости, ненужные эффекты, StrictMode и layout-эффекты проверяют отдельные навыки.
- Асинхронность JavaScript не дублируется: добавлены гонки загрузки в жизненном цикле React и отображение ожидающего состояния.
- React 19 явно обозначен в вопросах про ref как prop, form Actions и useActionState. SSR и Server Components не представлены как одно и то же; текущий Vite-проект не переводится на SSR/RSC.
- Мемоизация рассматривается на уровне React. Базовая мемоизация функций и виртуальный DOM уже разбираются в JavaScript, их определения повторно не добавлены.

## Содержание

| Подраздел                       | Вопросов | ID                 |
| ------------------------------- | -------- | ------------------ |
| Компоненты и рендеринг          | 9        | `components`       |
| Состояние и поток данных        | 7        | `state`            |
| Хуки и эффекты                  | 8        | `hooks`            |
| Refs и работа с DOM             | 4        | `refs`             |
| Context и управление состоянием | 4        | `context`          |
| Формы и пользовательский ввод   | 5        | `forms`            |
| Производительность              | 5        | `performance`      |
| Асинхронный интерфейс           | 4        | `async-ui`         |
| Серверный рендеринг и React 19  | 4        | `server-rendering` |
| Ошибки и тестирование           | 4        | `testing`          |

## Компоненты и рендеринг

1. Что такое React и что означает декларативный интерфейс? - `react-purpose`, базовый.
2. Что такое JSX и чем он отличается от HTML? - `react-jsx`, базовый.
3. Как работают props и children? - `react-props-children`, базовый.
4. Чем рендер отличается от изменения DOM? - `react-render-commit`, средний.
5. Какие ошибки возможны при условном рендеринге? - `react-conditional-rendering`, базовый.
6. Зачем React нужен key в списках? - `react-keys`, базовый, существующий вопрос.
7. Зачем нужны Fragment и явный ключ у фрагмента? - `react-fragments`, базовый.
8. Когда React сохраняет состояние, а когда сбрасывает его? - `react-state-identity`, средний.
9. Почему onClick={handleClick()} отличается от onClick={handleClick}? - `react-events`, базовый.

Источники: [Основы](https://react.dev/learn), [JSX](https://react.dev/learn/writing-markup-with-jsx), [Props](https://react.dev/learn/passing-props-to-a-component), [Render и commit](https://react.dev/learn/render-and-commit), [Идентичность состояния](https://react.dev/learn/preserving-and-resetting-state), [Fragment](https://react.dev/reference/react/Fragment), [События](https://react.dev/learn/responding-to-events).

## Состояние и поток данных

1. Почему значение state не меняется сразу после setState? - `react-state-snapshot`, базовый.
2. Что выведут три вызова setCount и когда нужен updater? - `react-state-queue`, средний.
3. Почему нельзя изменять объект или массив в state напрямую? - `react-state-immutability`, базовый.
4. Почему вычисляемые значения обычно не нужно хранить в state? - `react-derived-state`, средний.
5. Когда нужно поднимать состояние к общему родителю? - `react-lifting-state`, базовый.
6. Когда useReducer удобнее useState? - `react-use-reducer`, средний.
7. Как работает ленивое начальное состояние useState? - `react-lazy-state`, средний.

Источники: [Снимок состояния](https://react.dev/learn/state-as-a-snapshot), [Очередь обновлений](https://react.dev/learn/queueing-a-series-of-state-updates), [useState](https://react.dev/reference/react/useState), [Обновление объектов](https://react.dev/learn/updating-objects-in-state), [Подъём состояния](https://react.dev/learn/sharing-state-between-components), [useReducer](https://react.dev/reference/react/useReducer).

## Хуки и эффекты

1. Какие правила вызова хуков нужно соблюдать? - `react-hooks-rules`, базовый.
2. Для чего нужен useEffect и его cleanup? - `effects`, средний, существующий вопрос.
3. Чем отличаются useEffect без массива, с [] и с зависимостями? - `react-effect-dependencies`, средний.
4. Когда useEffect не нужен и чем его заменить? - `react-effect-not-needed`, средний.
5. Что такое устаревшее замыкание в React? - `react-stale-closures`, средний.
6. Почему StrictMode повторно вызывает рендер и эффекты? - `react-strict-mode`, средний.
7. Когда нужен useLayoutEffect вместо useEffect? - `react-layout-effect`, продвинутый.
8. Что переиспользует пользовательский хук: состояние или логику? - `react-custom-hooks`, средний.

Источники: [Правила хуков](https://react.dev/reference/rules/rules-of-hooks), [useEffect](https://react.dev/reference/react/useEffect), [Когда эффект не нужен](https://react.dev/learn/you-might-not-need-an-effect), [StrictMode](https://react.dev/reference/react/StrictMode), [useLayoutEffect](https://react.dev/reference/react/useLayoutEffect), [Пользовательские хуки](https://react.dev/learn/reusing-logic-with-custom-hooks).

## Refs и работа с DOM

1. Чем useRef отличается от useState? - `react-ref-state`, базовый.
2. Как передать ref через свой компонент в React 19? - `react-ref-prop`, средний.
3. Зачем нужен useImperativeHandle? - `react-imperative-handle`, продвинутый.
4. Как Portal влияет на DOM, события и Context? - `react-portals`, средний.

Источники: [useRef](https://react.dev/reference/react/useRef), [Ref в React 19](https://react.dev/reference/react/forwardRef), [useImperativeHandle](https://react.dev/reference/react/useImperativeHandle), [Portal](https://react.dev/reference/react-dom/createPortal).

## Context и управление состоянием

1. Как Context передаёт данные и откуда берётся значение по умолчанию? - `react-context`, средний.
2. Почему потребители Context рендерятся при изменении value? - `react-context-renders`, средний.
3. Как выбрать между props, Context и внешним store? - `react-state-location`, средний.
4. Для чего предназначен useSyncExternalStore? - `react-external-store`, продвинутый.

Источники: [useContext](https://react.dev/reference/react/useContext), [Общие данные](https://react.dev/learn/sharing-state-between-components), [useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore).

## Формы и пользовательский ввод

1. Чем управляемое поле отличается от неуправляемого? - `react-controlled-input`, базовый.
2. Как обработать отправку формы и получить её данные? - `react-form-submit`, базовый.
3. Как связать label и сообщение об ошибке с полем? - `react-accessible-fields`, средний.
4. Как useActionState помогает обрабатывать форму в React 19? - `react-action-state`, продвинутый.
5. Почему useFormStatus не видит форму из того же компонента? - `react-form-status`, средний.

Источники: [Input](https://react.dev/reference/react-dom/components/input), [Form](https://react.dev/reference/react-dom/components/form), [useId](https://react.dev/reference/react/useId), [useActionState](https://react.dev/reference/react/useActionState), [useFormStatus](https://react.dev/reference/react-dom/hooks/useFormStatus).

## Производительность

1. Какие рендеры может пропустить React.memo? - `react-memo`, средний.
2. Чем useMemo отличается от useCallback? - `react-memo-callback`, средний.
3. Как найти причину медленного взаимодействия в React? - `react-profiler`, средний.
4. Когда нужна виртуализация длинного списка? - `react-list-windowing`, средний.
5. Что оптимизирует React Compiler и заменяет ли он правила React? - `react-compiler`, продвинутый.

Источники: [memo](https://react.dev/reference/react/memo), [useMemo](https://react.dev/reference/react/useMemo), [useCallback](https://react.dev/reference/react/useCallback), [Profiler](https://react.dev/reference/react/Profiler), [React Compiler](https://react.dev/learn/react-compiler/introduction), [виртуализация: TanStack Virtual](https://tanstack.com/virtual/latest/docs/introduction).

## Асинхронный интерфейс

1. Как предотвратить гонку ответов при загрузке данных в эффекте? - `react-fetch-races`, средний.
2. Как работают lazy и Suspense и что они не отслеживают? - `react-lazy-suspense`, средний.
3. Чем useTransition отличается от useDeferredValue? - `react-transition-deferred`, продвинутый.
4. Как организовать оптимистичное обновление через useOptimistic? - `react-optimistic-ui`, продвинутый.

Источники: [Загрузка в эффекте](https://react.dev/reference/react/useEffect), [lazy](https://react.dev/reference/react/lazy), [Suspense](https://react.dev/reference/react/Suspense), [useTransition](https://react.dev/reference/react/useTransition), [useDeferredValue](https://react.dev/reference/react/useDeferredValue), [useOptimistic](https://react.dev/reference/react/useOptimistic).

## Серверный рендеринг и React 19

1. Чем CSR отличается от SSR и статического рендеринга? - `react-csr-ssr`, средний.
2. Что такое гидратация и почему возникает hydration mismatch? - `react-hydration`, продвинутый.
3. Чем Server Components отличаются от SSR и Client Components? - `react-server-components`, продвинутый.
4. Как API use читает Promise и чем отличается от await? - `react-use-resource`, продвинутый.

Источники: [серверные API](https://react.dev/reference/react-dom/server), [hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot), [use client](https://react.dev/reference/rsc/use-client), [Server Components](https://react.dev/reference/rsc/server-components), [use](https://react.dev/reference/react/use).

## Ошибки и тестирование

1. Какие ошибки ловит Error Boundary и какие остаются снаружи? - `react-error-boundary`, средний.
2. Что стоит проверять в тесте React-компонента? - `react-test-behavior`, средний.
3. Чем getBy, queryBy и findBy отличаются в асинхронном тесте? - `react-async-tests`, средний.
4. Как проверить корректность подписки и cleanup компонента? - `react-effect-test`, средний.

Источники: [Error Boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary), [act](https://react.dev/reference/react/act), [Testing Library: принципы](https://testing-library.com/docs/guiding-principles/), [Testing Library: запросы](https://testing-library.com/docs/queries/about/), [useEffect](https://react.dev/reference/react/useEffect).

## Применение

Выполните `pnpm db:seed` самостоятельно. Если ещё не применена подготовленная ранее миграция `002_catalog_metadata.sql`, сначала выполните `pnpm db:migrate`. Новых SQL-миграций для этой подборки нет. Сервер, контейнеры, seed, миграции, сборка и проверки не запускались. Примеры - учебные фрагменты; используемые хуки импортируются из React, если импорт не показан явно. Пример lazy требует упомянутого отдельного модуля; он не создаёт его в приложении. Тестовая инфраструктура и SSR не устанавливались.
