**Multipart/form-data представляет тело как части, разделённые boundary, с метаданными полей и файлов.**

<!-- wishu:answer-block -->

### Механизм и границы

- Браузер при отправке `FormData` формирует подходящий `Content-Type` с boundary.

- Если вручную поставить только multipart/form-data без параметра, сервер может не разобрать тело. Имя и тип файла не заменяют серверную проверку содержимого.

### Сценарий

Для `FormData` с полем title и File передают само тело; браузер согласует разделитель и заголовок.

```javascript
const body = new FormData()
body.append("title", "Резюме")
body.append("file", file) // File из поля формы
await fetch("/api/documents", { method: "POST", body })
// Content-Type с boundary установит браузер.
```

### Типичная ошибка

Вручную перезаписать `Content-Type` так, что boundary тела и заголовка больше не согласованы.

### Для закрепления

- [Чем Content-Type отличается от Accept?](/questions/http-content-negotiation)

### Источники

- [Использование Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
