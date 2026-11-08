**SRI проверяет соответствие загруженного ресурса ожидаемому хешу, а `Referrer-Policy` управляет передаваемой информацией об адресе источника.**

<!-- wishu:answer-block -->

### Механизм и границы

- При подключении внешнего ресурса можно одновременно контролировать подмену байтов и лишнее раскрытие URL.

- SRI не делает исходно опасный скрипт безопасным; для cross-origin ресурса важен корректный CORS-контракт. `Referrer-Policy` не удаляет секрет из самого запрошенного URL.

### Сценарий

Подключение фиксированной версии script использует integrity; отдельная referrerpolicy ограничивает контекст адреса страницы.

### Типичная ошибка

Считать integrity проверкой доверия к поведению кода или `Referrer-Policy` защитой всех URL-секретов.

### Для закрепления

- [Чем Content-Type отличается от Accept?](/questions/http-content-negotiation)

### Источники

- [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity)

- [Referrer-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referrer-Policy)
