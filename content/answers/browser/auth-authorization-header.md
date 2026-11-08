**`Authorization` явно передаёт credential по схеме API, а cookie браузер может прикладывать автоматически по своей области.**

<!-- wishu:answer-block -->

### Механизм и границы

- Bearer-токен требует защиты хранения и передачи; само имя заголовка не делает его безопасным.

- `HttpOnly`-cookie недоступна скрипту, но автоматическая отправка требует анализа CSRF. Cross-origin `Authorization` обычно влияет на preflight.

### Сценарий

Скрипт выставляет `Authorization`: Bearer ...; это отличается от серверной `HttpOnly`-cookie, которую скрипт не читает.

### Типичная ошибка

Считать один способ автоматически защищённым сразу от XSS, CSRF и кражи credentials.

### Для закрепления

- [Чем CSRF отличается от XSS и как защищать изменение данных?](/questions/browser-csrf)

### Источники

- [OWASP: Authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
