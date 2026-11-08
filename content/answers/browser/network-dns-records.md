**A сопоставляет имя с IPv4, AAAA - с IPv6, а CNAME задаёт псевдоним другого имени.**

<!-- wishu:answer-block -->

### Механизм и границы

- DNS-ответ не является HTTP-редиректом: браузер не получает новый URL от одного CNAME.

- Путь, query и схема не становятся частью обычной A/AAAA-записи. Доменное имя продолжает участвовать в HTTP и проверке TLS.

### Сценарий

www.example.com через CNAME ведёт к имени CDN, но адрес страницы остаётся www.example.com.

### Типичная ошибка

Ожидать от DNS перенаправления на /new-page.

### Для закрепления

- [Зачем браузеру DNS перед HTTPS-запросом?](/questions/network-dns)

### Источники

- [DNS](https://developer.mozilla.org/en-US/docs/Glossary/DNS)
