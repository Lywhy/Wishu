**После разрешения CORS скрипт получает не произвольный набор заголовков: для дополнительных доступных полей используют `Access-Control-Expose-Headers`.**

<!-- wishu:answer-block -->

### Механизм и границы

- Safelisted response headers доступны по стандартному контракту.

- `Set-Cookie` не превращается в читаемый заголовок Fetch через expose; браузер обрабатывает его отдельно. При credentials wildcard имеет особые ограничения.

### Сценарий

Для чтения прикладного X-`Request`-Id сервер явно раскрывает этот заголовок.

### Типичная ошибка

Видеть заголовок в DevTools и считать, что response.headers обязан предоставить его скрипту.

### Источники

- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)
