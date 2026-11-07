**Тело запроса должно соответствовать серверному формату. JSON обычно требует явной сериализации и подходящего заголовка, а FormData передаёт multipart-данные с границей, которую формирует браузер.**

<!-- wishu:answer-block -->

### Механизм и границы

Не задавайте вручную только multipart/form-data для FormData: без согласованной boundary сервер может не разобрать тело. URLSearchParams имеет другой формат и правила кодирования.

Сам объект JavaScript не становится JSON только от выставленного Content-Type. Отдельно проверьте поддерживаемый метод, повторное использование stream-body и серверные ограничения файлов.

<!-- wishu:answer-block -->

### Источник

[MDN: Fetch_API/Using_Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).
