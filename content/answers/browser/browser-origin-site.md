**`Origin` определяется схемой, хостом и портом, а site использует другую границу, важную в том числе для `SameSite` и политик разделения данных.**

<!-- wishu:answer-block -->

### Механизм и границы

- Разные поддомены могут иметь разные origin и относиться к одному site. В современных schemeful-контрактах схема также важна.

- Для IP, специальных схем и opaque origins действуют отдельные правила; не заменяйте расчёт платформы ручным обрезанием домена.

### Сценарий

app.example.com и api.example.com могут быть cross-origin, но `same-site` при соответствующей схеме.

### Типичная ошибка

Считать `SameSite`=Lax синонимом запрета любого запроса на другой поддомен.

### Для закрепления

- [Что делают HttpOnly, Secure и SameSite у cookie?](/questions/browser-cookie-flags)

### Источники

- [Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy)
