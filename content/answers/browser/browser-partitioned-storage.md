**Partitioning добавляет к границе хранения контекст верхнеуровневого сайта или иной ключ политики, ограничивая связывание состояния между embedding-сценариями.**

<!-- wishu:answer-block -->

### Механизм и границы

- Один встроенный origin не обязан получать одну общую cookie/storage-область под разными top-level sites.

- Partitioned cookies и общая политика разделения storage связаны, но не являются одним универсальным API. Проверяйте поддержку, `Secure` и условия соответствующего механизма.

- Storage Access API предоставляет отдельный контролируемый контракт там, где поддержан, а не безусловный обход приватности.

### Сценарий

Один виджет на двух независимых сайтах может видеть разделённые состояния, хотя собственный iframe-origin одинаков.

```http
Set-Cookie: __Host-widget=opaque-id; Secure; Path=/; SameSite=None; Partitioned
```

Это пример CHIPS для поддерживающих браузеров, а не обещание универсального cross-site-входа. Состояние привязано к разделу верхнеуровневого сайта; поддержка и доступ проверяются отдельно.

### Типичная ошибка

Считать third-party cookie, partitioned cookie и first-party cookie взаимозаменяемыми при проектировании входа.

### Для закрепления

- [Почему cookies во встроенном или межсайтовом контексте могут не работать?](/questions/cookie-third-party)

### Источники

- [State Partitioning](https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/State_Partitioning)

- [Partitioned cookies (CHIPS)](https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/Third-party_cookies/Partitioned_cookies)
