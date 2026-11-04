# Наполнение оставшихся разделов вопросов

Подготовлено 163 новых вопроса для 14 разделов. В этих разделах теперь 168 вопросов; сохранены 5 существующих вопросов и их ID. Добавлен 51 подраздел. У 9 ранее недоступных карточек снята пометка разработки. Каждый из 14 разделов содержит 4 подраздела и 12 вопросов.

Каталог JavaScript, TypeScript и React не изменялся. Существующие вопросы semantic-button, http-cache, nestjs-dependencies, postgresql-indexes и git-rebase сохранены с прежними ответами, адресами и привязкой к подразделам. Прогресс и избранное не переносятся и не сбрасываются. Новые вопросы имеют popular: false; популярность не выдумывается как статистика.

## Классификация и повторное использование

1. SQL содержит общую реляционную модель и запросы. PostgreSQL содержит особенности MVCC, индексов, типов и обслуживания этой СУБД. Примеры SQL ориентированы на PostgreSQL; синтаксис параметров драйвера отмечен отдельно.
2. Node.js рассматривается как серверная среда, NestJS - как архитектурный фреймворк. Базовое определение event loop не повторяется: вопрос Node.js разбирает блокировку обслуживающего потока и внутренний пул.
3. В Next.js общие определения React не продублированы: вопросы посвящены App Router, границе импортов, загрузке и HTTP-контрактам. Это учебное содержимое, Next.js не устанавливался в приложение.
4. В Vue вопросы привязаны к Vue 3. Общие замыкания и классы JavaScript не повторяются. Ref и computed рассматриваются по контрактам Vue, не смешиваются с одноимёнными идеями React.
5. SEO использует определения Google Search Central. HTTP-кеш и CORS остаются в браузерном разделе; SEO рассматривает обход, индексацию, canonical и согласованность URL.
6. Frontend инструменты содержит роль проверки типов в сборке, а не повтор системы типов TypeScript. Общие определения tree shaking, code splitting и Core Web Vitals остаются в JavaScript.
7. Существующие вопросы key, JSON, прототипы и сравнение Map/Object из JavaScript не копируются в новые категории. Redis Hash и Java HashMap имеют самостоятельные контракты.
8. Разные сохранённые ID не объединялись. Общая тема в соседних категориях допускается только при различающемся проверяемом навыке; например, управление транзакционным клиентом в NestJS и видимость строк в PostgreSQL.

## Сводка

| Раздел               | Подразделов | Новых вопросов | Всего вопросов |
| -------------------- | ----------- | -------------- | -------------- |
| HTML и CSS           | 4           | 11             | 12             |
| Браузер и HTTP       | 4           | 11             | 12             |
| Vue                  | 4           | 12             | 12             |
| Next.js              | 4           | 12             | 12             |
| SEO                  | 4           | 12             | 12             |
| Frontend инструменты | 4           | 12             | 12             |
| NestJS               | 4           | 11             | 12             |
| Node.js              | 4           | 12             | 12             |
| Java                 | 4           | 12             | 12             |
| Git                  | 4           | 11             | 12             |
| Docker               | 4           | 12             | 12             |
| SQL                  | 4           | 12             | 12             |
| PostgreSQL           | 4           | 11             | 12             |
| Redis                | 4           | 12             | 12             |

## HTML и CSS

### Семантика и доступность

1. Почему для действия лучше использовать button, а не div? - `semantic-button`, базовый, существующий вопрос.
2. Зачем нужны main, nav, header и section? - `html-landmarks`, базовый.
3. Почему placeholder не заменяет label у поля? - `html-form-label`, базовый.

### Каскад и блочная модель

1. Как браузер выбирает правило при конфликте CSS? - `css-cascade`, средний.
2. Чем content-box отличается от border-box? - `css-box-sizing`, базовый.
3. Какие CSS-свойства наследуются и что делают inherit и initial? - `css-inheritance`, средний.

### Построение макета

1. Когда выбрать Flexbox, а когда Grid? - `css-flex-grid`, базовый.
2. Почему flex-элемент не сжимается и ломает макет? - `css-flex-min-size`, средний.
3. Почему большой z-index не поднимает элемент над соседним блоком? - `css-position-stacking`, средний.

### Адаптивность

1. Чем media query отличается от container query? - `css-media-container`, средний.
2. Чем rem, em, проценты и viewport-единицы отличаются? - `css-relative-units`, базовый.
3. Для чего нужны srcset, sizes и размеры изображения? - `html-responsive-images`, средний.

Источники: [Структура HTML](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content), [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA), [Каскад](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Handling_conflicts), [Layout](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout), [Container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries), [Stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Positioned_layout/Stacking_context).

## Браузер и HTTP

### HTTP и кеширование

1. Чем Cache-Control отличается от ETag? - `http-cache`, средний, существующий вопрос.
2. Что означает идемпотентность HTTP-метода? - `http-idempotency`, средний.
3. Как различать 401, 403, 404 и 409 в API? - `http-status-codes`, базовый.

### Сеть и соединения

1. Зачем браузеру DNS перед HTTPS-запросом? - `network-dns`, базовый.
2. Что защищает HTTPS и чего он не гарантирует? - `network-https`, базовый.
3. Чем HTTP/2 и HTTP/3 отличаются в работе с соединениями? - `http-multiplexing`, средний.

### Границы безопасности

1. Что ограничивает same-origin policy и как CORS разрешает чтение ответа? - `browser-cors`, средний.
2. Что делают HttpOnly, Secure и SameSite у cookie? - `browser-cookie-flags`, средний.
3. Чем CSRF отличается от XSS и как защищать изменение данных? - `browser-csrf`, средний.

### Доставка и диагностика

1. Как работают Content-Encoding и Accept-Encoding? - `http-compression`, базовый.
2. Что даёт CDN и чем опасно кешировать персональный ответ? - `http-cdn`, средний.
3. Как по Network waterfall понять причину медленной загрузки? - `network-waterfall`, средний.

Источники: [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview), [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS), [Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies), [Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy), [DevTools](https://developer.chrome.com/docs/devtools/overview).

## Vue

### Компоненты и шаблоны

1. Как устроен Single-File Component во Vue 3? - `vue-sfc`, базовый.
2. Чем v-if отличается от v-show? - `vue-if-show`, базовый.
3. Зачем Vue нужен key в v-for и почему не стоит совмещать v-if и v-for? - `vue-list-keys`, средний.

### Реактивность

1. Чем ref отличается от reactive? - `vue-ref-reactive`, базовый.
2. Чем computed отличается от метода в шаблоне? - `vue-computed`, средний.
3. Когда деструктуризация reactive теряет реактивную связь? - `vue-destructure`, средний.

### Взаимодействие компонентов

1. Почему дочерний компонент не должен изменять props? - `vue-props-events`, базовый.
2. Как устроен v-model у собственного компонента? - `vue-v-model`, средний.
3. Что передают обычные и scoped slots? - `vue-slots`, средний.

### Composition API

1. Чем watch отличается от watchEffect? - `vue-watch`, средний.
2. Когда использовать onMounted и onUnmounted? - `vue-lifecycle-cleanup`, средний.
3. Что такое composable и разделяют ли его вызовы состояние? - `vue-composables`, средний.

Источники: [Реактивность](https://vuejs.org/guide/essentials/reactivity-fundamentals.html), [Computed](https://vuejs.org/guide/essentials/computed.html), [Watchers](https://vuejs.org/guide/essentials/watchers.html), [Props](https://vuejs.org/guide/components/props.html), [Slots](https://vuejs.org/guide/components/slots.html), [Списки](https://vuejs.org/guide/essentials/list.html), [Условия](https://vuejs.org/guide/essentials/conditional.html), [Lifecycle](https://vuejs.org/guide/essentials/lifecycle.html), [Composables](https://vuejs.org/guide/reusability/composables.html).

## Next.js

### App Router и маршруты

1. Как файлы page и layout задают маршрут в App Router? - `next-app-router`, базовый.
2. Зачем Link вместо обычного перехода и когда нужен router? - `next-navigation`, базовый.
3. Как loading.tsx и Suspense помогают при медленной странице? - `next-loading-streaming`, средний.

### Границы выполнения

1. Что меняет use client для дерева импортов в Next.js? - `next-client-boundary`, средний.
2. Почему Server Component не стоит загружать свои данные через собственный Route Handler? - `next-server-data`, средний.
3. Какие данные можно передать из Server Component в Client Component? - `next-props-serialization`, средний.

### Данные и кеширование

1. Почему нельзя считать, что любой fetch в Next.js всегда кешируется? - `next-cache-policy`, продвинутый.
2. Чем инвалидирование кеша отличается от обновления клиентского интерфейса? - `next-revalidation`, продвинутый.
3. Почему Server Action требует проверки прав, даже если кнопка скрыта? - `next-server-actions`, средний.

### HTTP и отображение

1. Для чего нужен route.ts и как он отличается от page.tsx? - `next-route-handler`, базовый.
2. Чем error.tsx отличается от not-found.tsx? - `next-route-errors`, средний.
3. Когда использовать metadata и generateMetadata? - `next-metadata`, средний.

Источники: [Layouts и pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages), [Server/Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components), [Кеш](https://nextjs.org/docs/app/getting-started/caching), [Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers), [Ошибки](https://nextjs.org/docs/app/getting-started/error-handling), [Metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata).

## SEO

### Обход и индексация

1. Чем обход страницы отличается от её индексации? - `seo-crawl-index`, базовый.
2. Чем robots.txt отличается от noindex? - `seo-robots-noindex`, средний.
3. Какие SEO-риски возникают у сайта, который показывает контент только после JavaScript? - `seo-javascript`, средний.

### Содержимое и метаданные

1. Какую роль играют title и meta description? - `seo-title-description`, базовый.
2. Зачем нужна понятная иерархия заголовков? - `seo-headings`, базовый.
3. Почему для важных внутренних переходов нужны обычные ссылки? - `seo-internal-links`, средний.

### Адреса и дубли

1. Для чего нужен rel=canonical и является ли он перенаправлением? - `seo-canonical`, средний.
2. Когда для переноса страницы используют 301 или 308, а когда 302 или 307? - `seo-redirect-status`, средний.
3. Что включать в sitemap и чего он не гарантирует? - `seo-sitemap`, базовый.

### Разметка и диагностика

1. Что дают структурированные данные и гарантируют ли они расширенный результат? - `seo-structured-data`, средний.
2. Как исследовать страницу, которая не появляется в Google? - `seo-search-console`, средний.
3. Почему хороший показатель скорости не гарантирует высокую позицию в поиске? - `seo-performance`, средний.

Источники: [Основы SEO](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [Robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro), [Canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [Структурированные данные](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data), [JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [Sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview), [Page Experience](https://developers.google.com/search/docs/appearance/page-experience).

## Frontend инструменты

### Зависимости и пакеты

1. Чем package.json отличается от lockfile? - `tools-manifest-lock`, базовый.
2. Чем диапазоны ^1.2.3 и ~1.2.3 отличаются? - `tools-semver`, базовый.
3. Зачем библиотеке peerDependencies? - `tools-peer-dependencies`, средний.

### Сборка и преобразования

1. Чем dev-сервер Vite отличается от production-сборки? - `tools-vite-modes`, базовый.
2. Почему успешное преобразование TypeScript не означает отсутствие ошибок типов? - `tools-transpile-typecheck`, средний.
3. Зачем нужны source maps и что учитывать при публикации? - `tools-source-maps`, средний.

### Качество и автоматизация

1. Чем линтер отличается от форматтера? - `tools-lint-format`, базовый.
2. Чем unit, интеграционный и end-to-end тесты полезны frontend-проекту? - `tools-test-levels`, средний.
3. Что делает проверку проекта в CI воспроизводимой? - `tools-ci-reproducibility`, средний.

### Окружение проекта

1. Почему VITE_API_KEY нельзя считать секретом? - `tools-vite-env`, базовый.
2. Что решает proxy в dev-сервере и что произойдёт после публикации? - `tools-dev-proxy`, средний.
3. Почему alias импорта работает в редакторе, но ломается при сборке? - `tools-import-alias`, средний.

Источники: [Vite](https://vite.dev/guide/), [Vite: окружение](https://vite.dev/guide/env-and-mode), [Vite: alias](https://vite.dev/config/shared-options#resolve-alias), [Pnpm install](https://pnpm.io/cli/install), [Manifest и peer dependencies](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/), [TSConfig](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

## NestJS

### Архитектура приложения

1. Как NestJS связывает контроллеры и сервисы? - `nestjs-dependencies`, базовый, существующий вопрос.
2. Зачем NestJS нужны токены и custom providers? - `nest-provider-token`, средний.
3. Чем singleton, request и transient scope отличаются? - `nest-provider-scope`, средний.

### HTTP и входные данные

1. Почему контроллер стоит отделять от бизнес-логики сервиса? - `nest-controller-service`, базовый.
2. Почему DTO-интерфейс не заменяет ValidationPipe? - `nest-validation-dto`, базовый.
3. Для чего нужен Exception Filter? - `nest-exception-filter`, средний.

### Обработка запроса

1. Чем Middleware отличается от Guard? - `nest-middleware-guard`, средний.
2. Как Interceptor работает до и после обработчика? - `nest-interceptor`, средний.
3. Почему проверку формата параметра нельзя путать с проверкой доступа? - `nest-pipe-guard-order`, средний.

### Интеграции и проверяемость

1. Зачем проверять конфигурацию при старте приложения? - `nest-config-validation`, базовый.
2. Почему несколько запросов из сервиса не образуют транзакцию автоматически? - `nest-db-transaction`, средний.
3. Как DI помогает изолированно проверить сервис NestJS? - `nest-testing-providers`, средний.

Источники: [Custom providers](https://docs.nestjs.com/fundamentals/custom-providers), [Scopes](https://docs.nestjs.com/fundamentals/injection-scopes), [Validation](https://docs.nestjs.com/techniques/validation), [Filters](https://docs.nestjs.com/exception-filters), [Guards](https://docs.nestjs.com/guards), [Interceptors](https://docs.nestjs.com/interceptors), [Lifecycle запроса](https://docs.nestjs.com/faq/request-lifecycle), [Конфигурация](https://docs.nestjs.com/techniques/configuration), [Тестирование](https://docs.nestjs.com/fundamentals/testing), [Транзакция pg](https://node-postgres.com/features/transactions).

## Node.js

### Среда выполнения и модули

1. Как CommonJS отличается от ESM в Node.js? - `node-esm-cjs`, базовый.
2. Почему readFileSync опасен в обработчике HTTP-запроса? - `node-fs-sync`, базовый.
3. Когда Node.js приложению нужны worker_threads? - `node-worker-threads`, средний.

### Асинхронная работа Node.js

1. Что именно может блокировать event loop Node.js? - `node-loop-responsibility`, средний.
2. Какие операции используют пул libuv и почему это важно? - `node-libuv-pool`, продвинутый.
3. Вызывает ли EventEmitter слушателей асинхронно? - `node-event-emitter`, средний.

### Потоки и бинарные данные

1. Для чего нужен Buffer и почему длина строки не равна числу байт? - `node-buffer`, базовый.
2. Что такое backpressure в Node.js Streams? - `node-backpressure`, средний.
3. Почему pipeline часто удобнее ручной цепочки data и write? - `node-pipeline`, средний.

### Ресурсы приложения

1. Почему process.env.PORT нужно явно проверять? - `node-env-validation`, базовый.
2. Что входит в корректное завершение HTTP-сервера Node.js? - `node-graceful-shutdown`, средний.
3. Почему соединение с БД обычно берут из пула? - `node-connection-pool`, средний.

Источники: [ESM](https://nodejs.org/api/esm.html), [FS](https://nodejs.org/api/fs.html), [Workers](https://nodejs.org/api/worker_threads.html), [Event loop](https://nodejs.org/learn/asynchronous-work/dont-block-the-event-loop), [Events](https://nodejs.org/api/events.html), [Buffer](https://nodejs.org/api/buffer.html), [Streams](https://nodejs.org/api/stream.html), [Process](https://nodejs.org/api/process.html), [Пул pg](https://node-postgres.com/features/pooling).

## Java

### Типы и значения

1. Чем примитивы Java отличаются от классов-обёрток? - `java-primitives-boxing`, базовый.
2. Передаются ли объекты Java в метод по ссылке? - `java-pass-by-value`, базовый.
3. Как связаны equals и hashCode? - `java-equals-hashcode`, средний.

### Объекты и контракты

1. Когда выбрать interface, а когда абстрактный класс? - `java-interface-abstract`, средний.
2. Чем перегрузка метода отличается от переопределения? - `java-overload-override`, базовый.
3. Делает ли final объект неизменяемым? - `java-immutability-final`, средний.

### Коллекции и Stream API

1. Как выбрать между List, Set и Map? - `java-list-set-map`, базовый.
2. Как HashMap ищет ключ и почему коллизия не означает потерю значения? - `java-hashmap`, средний.
3. Почему Stream без terminal operation может ничего не вычислить? - `java-stream-lazy`, средний.

### Ошибки и ресурсы

1. Чем checked exceptions отличаются от unchecked? - `java-checked-exceptions`, базовый.
2. Как try-with-resources закрывает ресурсы при ошибке? - `java-try-resources`, средний.
3. Почему volatile не делает count++ атомарным? - `java-thread-safety`, продвинутый.

Источники: [Примитивы](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html), [Аргументы](https://docs.oracle.com/javase/tutorial/java/javaOO/arguments.html), [Наследование](https://docs.oracle.com/javase/tutorial/java/IandI/index.html), [Object: equals/hashCode](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Object.html), [HashMap](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html), [Stream](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/package-summary.html), [Concurrency](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/package-summary.html), [Try-with-resources](https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html).

## Git

### Рабочие изменения

1. Чем рабочее дерево отличается от индекса и коммита? - `git-index`, базовый.
2. Что сравнивают git diff и git diff --staged? - `git-diff-staged`, базовый.
3. Почему .gitignore не скрывает уже отслеживаемый файл? - `git-ignore-tracked`, базовый.

### Ветки и история

1. Когда выбирать merge, а когда rebase? - `git-rebase`, средний, существующий вопрос.
2. Что такое ветка и на что указывает HEAD? - `git-branch-head`, базовый.
3. Когда merge может быть fast-forward? - `git-fast-forward`, средний.

### Совместная работа

1. Чем fetch отличается от pull? - `git-fetch-pull`, базовый.
2. Что означает конфликт слияния и как выбрать правильное решение? - `git-merge-conflict`, средний.
3. Почему force-with-lease безопаснее обычного force push? - `git-force-with-lease`, средний.

### Отмена и восстановление

1. Что делает git restore и почему важно выбрать источник? - `git-restore`, средний.
2. Когда подходит revert вместо переписывания истории? - `git-revert`, средний.
3. Как reflog помогает найти потерянный коммит? - `git-reflog`, средний.

Источники: [Рабочие изменения](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository), [Ветки](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging), [Gitignore](https://git-scm.com/docs/gitignore), [Fetch](https://git-scm.com/docs/git-fetch), [Restore](https://git-scm.com/docs/git-restore), [Revert](https://git-scm.com/docs/git-revert), [Reflog](https://git-scm.com/docs/git-reflog).

## Docker

### Образы и контейнеры

1. Чем образ отличается от контейнера? - `docker-image-container`, базовый.
2. Зачем образу слои и почему удаление секрета следующим RUN не спасает? - `docker-layers`, средний.
3. Почему контейнер завершается при остановке главного процесса? - `docker-pid-one`, базовый.

### Сборка образа

1. Почему зависимости часто копируют и устанавливают до исходников? - `docker-build-cache`, средний.
2. Что даёт multi-stage build? - `docker-multi-stage`, средний.
3. Почему ARG и ENV не подходят для приватного токена сборки? - `docker-build-secrets`, средний.

### Данные и сеть

1. Чем volume отличается от bind mount? - `docker-volume-bind`, базовый.
2. Почему localhost из API-контейнера не указывает на PostgreSQL-контейнер? - `docker-compose-dns`, базовый.
3. Чем публикация 127.0.0.1:15432:5432 отличается от 15432:5432? - `docker-published-port`, средний.

### Compose и эксплуатация

1. Гарантирует ли depends_on готовность базы принимать запросы? - `docker-readiness`, средний.
2. Чем подстановка .env в Compose отличается от окружения контейнера? - `docker-env-interpolation`, средний.
3. С чего начать диагностику контейнера, который постоянно перезапускается? - `docker-diagnosis`, средний.

Источники: [Контейнер](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/), [Dockerfile](https://docs.docker.com/build/concepts/dockerfile/), [Multi-stage](https://docs.docker.com/build/building/multi-stage/), [Build secrets](https://docs.docker.com/build/building/secrets/), [Volumes](https://docs.docker.com/engine/storage/volumes/), [Сеть](https://docs.docker.com/compose/how-tos/networking/), [Порядок запуска](https://docs.docker.com/compose/how-tos/startup-order/).

## SQL

### Реляционная модель

1. Чем PRIMARY KEY, UNIQUE и FOREIGN KEY отличаются? - `sql-keys-constraints`, базовый.
2. Почему сравнение column = NULL не находит пустые значения? - `sql-null`, базовый.
3. Почему параметры запроса защищают лучше конкатенации строк? - `sql-parameters`, базовый.

### Соединение таблиц

1. Чем INNER JOIN отличается от LEFT JOIN? - `sql-inner-left`, базовый.
2. Почему WHERE по правой таблице может изменить смысл LEFT JOIN? - `sql-left-filter`, средний.
3. Почему после соединения двух связей один ко многим завышается SUM? - `sql-join-duplicates`, средний.

### Агрегация и окна

1. Чем WHERE отличается от HAVING? - `sql-group-having`, базовый.
2. Чем COUNT(*) отличается от COUNT(column)? - `sql-count-null`, базовый.
3. Чем оконная функция отличается от GROUP BY? - `sql-window-functions`, средний.

### Составные запросы

1. Когда EXISTS удобнее JOIN? - `sql-exists`, средний.
2. Чем UNION отличается от UNION ALL? - `sql-union-all`, базовый.
3. Почему OFFSET-пагинация может замедляться и чем помогает курсор? - `sql-keyset-pagination`, средний.

Источники: [SQL tutorial](https://www.postgresql.org/docs/18/tutorial-sql.html), [Ограничения](https://www.postgresql.org/docs/18/ddl-constraints.html), [Соединения и группировка](https://www.postgresql.org/docs/18/queries-table-expressions.html), [Оконные функции](https://www.postgresql.org/docs/18/tutorial-window.html), [Выражения](https://www.postgresql.org/docs/18/sql-expressions.html).

## PostgreSQL

### Индексы и запросы

1. Зачем нужны индексы и почему они не всегда ускоряют запрос? - `postgresql-indexes`, средний, существующий вопрос.
2. Почему порядок столбцов составного B-tree индекса важен? - `pg-composite-index`, средний.
3. Чем EXPLAIN отличается от EXPLAIN ANALYZE? - `pg-explain-analyze`, средний.

### Конкурентный доступ

1. Как MVCC позволяет читать данные при параллельных изменениях? - `pg-mvcc`, средний.
2. Чем Read Committed отличается от Repeatable Read в PostgreSQL? - `pg-isolation`, продвинутый.
3. Как избежать потерянного обновления счётчика? - `pg-lost-update`, средний.

### Типы данных

1. Чем json отличается от jsonb и когда JSON не заменяет таблицы? - `pg-json-jsonb`, средний.
2. Хранит ли timestamptz исходный часовой пояс пользователя? - `pg-timestamptz`, средний.
3. Почему для денежных сумм часто выбирают numeric или целые минимальные единицы? - `pg-numeric-money`, базовый.

### Обслуживание и надёжность

1. Зачем PostgreSQL нужен VACUUM и что делает autovacuum? - `pg-vacuum`, средний.
2. Чем ожидание блокировки отличается от deadlock? - `pg-locks-deadlock`, средний.
3. Почему реплика и Docker volume не заменяют резервную копию? - `pg-backup-restore`, средний.

Источники: [Составные индексы](https://www.postgresql.org/docs/18/indexes-multicolumn.html), [EXPLAIN](https://www.postgresql.org/docs/18/using-explain.html), [MVCC](https://www.postgresql.org/docs/18/mvcc-intro.html), [Изоляция](https://www.postgresql.org/docs/18/transaction-iso.html), [JSON](https://www.postgresql.org/docs/18/datatype-json.html), [Время](https://www.postgresql.org/docs/18/datatype-datetime.html), [Числа](https://www.postgresql.org/docs/18/datatype-numeric.html), [VACUUM](https://www.postgresql.org/docs/18/routine-vacuuming.html), [Блокировки](https://www.postgresql.org/docs/18/explicit-locking.html), [Backup](https://www.postgresql.org/docs/18/backup.html).

## Redis

### Типы данных

1. Что хранит Redis String и почему это не только текст? - `redis-string`, базовый.
2. Когда Redis Hash удобнее JSON-строки? - `redis-hash`, базовый.
3. Как Sorted Set подходит для таблицы рейтинга? - `redis-sorted-set`, средний.

### Атомарность и пакетирование

1. Почему SET key value NX EX лучше, чем отдельные SETNX и EXPIRE? - `redis-set-nx`, средний.
2. Чем pipeline отличается от транзакции Redis? - `redis-pipeline`, средний.
3. Что гарантируют MULTI/EXEC и зачем WATCH? - `redis-transactions`, продвинутый.

### Кеширование

1. Чем истечение TTL отличается от eviction? - `redis-ttl-eviction`, базовый.
2. Как работает cache-aside и где возникает устаревание? - `redis-cache-aside`, средний.
3. Что такое cache stampede и как уменьшить его вероятность? - `redis-cache-stampede`, средний.

### Надёжность и обслуживание

1. Чем RDB отличается от AOF? - `redis-rdb-aof`, средний.
2. Гарантирует ли Redis-реплика немедленное чтение последней записи? - `redis-replication`, продвинутый.
3. Почему SCAN обычно предпочтительнее KEYS в работающем сервисе? - `redis-scan`, средний.

Источники: [Типы](https://redis.io/docs/latest/develop/data-types/), [Sorted sets](https://redis.io/docs/latest/develop/data-types/sorted-sets/), [SET](https://redis.io/docs/latest/commands/set/), [TTL](https://redis.io/docs/latest/commands/expire/), [Pipeline](https://redis.io/docs/latest/develop/using-commands/pipelining/), [Transactions](https://redis.io/docs/latest/develop/using-commands/transactions/), [Persistence](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/), [Replication](https://redis.io/docs/latest/operate/oss_and_stack/management/replication/), [SCAN](https://redis.io/docs/latest/commands/scan/), [Latency](https://redis.io/docs/latest/operate/oss_and_stack/management/optimization/latency/).

## Применение и ограничения

Выполните `pnpm db:seed` самостоятельно. Если ранее подготовленная миграция `002_catalog_metadata.sql` ещё не применена, сначала выполните `pnpm db:migrate`. Для этого наполнения новые миграции не нужны.

Форматирование выполнено. Приложение, Docker, база, компиляторы, примеры, сборка, линтер и тесты не запускались. Примеры являются учебными фрагментами и не выполняются приложением. Установок новых фреймворков, JDK или Redis нет. Разделы обучения и задач этим наполнением не изменены.

Технические оговорки: кеш Next.js зависит от версии и конфигурации; материалы Java используют стабильные контракты языка и API Java 21 (отдельные Oracle Tutorials описывают более раннюю базу языка); параметры .env зависят от инструмента и окружения; модель SQL примеров - PostgreSQL 18. Ответы не содержат универсальных гарантий скорости, ранжирования или отсутствия потерь при репликации.
