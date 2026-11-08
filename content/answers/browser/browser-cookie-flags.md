**`HttpOnly` ограничивает доступ JavaScript, `Secure` - незащищённую передачу, а `SameSite` - участие cookie в межсайтовом контексте.**

<!-- wishu:answer-block -->

### Механизм и границы

- `HttpOnly`-cookie всё ещё может отправляться запросом браузера; это не защита от всех действий XSS. `SameSite` опирается на site, который не равен origin; None требует `Secure`.

- Эти флаги не заменяют серверный контроль доступа и соответствующую CSRF-защиту. Для __Host- и других префиксов действуют дополнительные требования платформы.

### Сценарий

Сессионная cookie может быть `HttpOnly`; `Secure`; `SameSite`=Lax, но чувствительная операция всё равно проверяет право и CSRF-контракт.

```http
Set-Cookie: __Host-sid=opaque-id; Path=/; Secure; HttpOnly; SameSite=Lax
```

Префикс __Host- в поддерживающих браузерах требует `Secure`, `Path`=/ и отсутствия `Domain`. `HttpOnly` ограничивает чтение из JavaScript, но не исправляет XSS и не заменяет CSRF-защиту.

### Типичная ошибка

Считать `Secure` шифрованием значения в хранилище или `HttpOnly` запретом браузеру выполнять запрос с cookie.

### Источники

- [HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies)
