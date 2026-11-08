**Сервер устанавливает cookie через `Set-Cookie`, а браузер хранит её и добавляет Cookie в подходящие последующие запросы.**

<!-- wishu:answer-block -->

### Механизм и границы

- Область, срок, флаги и политика браузера определяют возможность хранения и отправки.

- JavaScript не видит `HttpOnly`-cookie и не получает `Set-Cookie` как обычный читаемый заголовок Fetch. Наличие записи в storage ещё не доказывает её отправку в конкретном запросе.

### Сценарий

После входа сервер выдаёт сессионную cookie; следующий допустимый запрос несёт идентификатор сессии.

```http
HTTP/1.1 200 OK
Set-Cookie: sid=opaque-session-id; Path=/; Secure; HttpOnly; SameSite=Lax

GET /me HTTP/1.1
Host: example.com
Cookie: sid=opaque-session-id
```

### Типичная ошибка

Считать одну строку `document.cookie` полным списком всех серверных cookies.

### Для закрепления

- [Как работает document.cookie и какие ограничения имеют cookies?](/questions/document-cookie)

### Источники

- [HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies)
