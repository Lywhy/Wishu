**URL может включать схему, authority с хостом и портом, путь, query и fragment.**

<!-- wishu:answer-block -->

### Механизм и границы

- Fragment обрабатывается клиентом и не отправляется как часть HTTP request target. Query участвует в адресе запроса и может попадать в логи.

- Значение сегмента нельзя считать доверенным или секретным только из-за его расположения.

### Сценарий

В `https://example.com:8443/docs?q=cache#etag` сервер получает путь и query, но не #etag.

```text
URL:      https://api.example.com:8443/items?q=tea#reviews
scheme:   https
host:     api.example.com
port:     8443
path:     /items
query:    q=tea
fragment: reviews

Request target: /items?q=tea
```

### Типичная ошибка

Хранить токен в query, рассчитывая скрыть его как fragment.

### Источники

- [URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL)
