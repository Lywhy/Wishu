**Для раскрытия credentialed cross-origin-ответа нужны согласованные credentials клиента и точный разрешённый origin с соответствующим Allow-Credentials.**

<!-- wishu:answer-block -->

### Механизм и границы

- Wildcard * не подходит как `Access-Control-Allow-Origin` в таком сценарии.

- Сервер должен проверять origin по доверенной политике и при динамическом выборе учитывать кеширование ответа. Cookies дополнительно ограничены `SameSite` и политиками third-party.

### Сценарий

Сервер разрешает https://app.example.com, а не безусловно отражает любой присланный `Origin`.

```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Credentials: true
Vary: Origin
Content-Type: application/json

{"name":"Alex"}
```

Это заголовки фактического ответа для разрешённого origin. Если запрос требует preflight, сервер отдельно отвечает на OPTIONS с допустимыми методом и заголовками; `Origin` проверяется по allowlist.

### Типичная ошибка

Отражать произвольный `Origin` вместе с credentials ради устранения ошибки в консоли.

### Для закрепления

- [Как credentials влияет на cookies в запросе Fetch?](/questions/fetch-credentials)

### Источники

- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)
