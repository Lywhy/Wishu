**Тело запроса должно соответствовать серверному формату. JSON обычно требует явной сериализации и подходящего заголовка, а `FormData` передаёт multipart-данные с границей, которую формирует браузер.**

<!-- wishu:answer-block -->

### Как это работает

Не задавайте вручную только multipart/form-data для `FormData`: без согласованной boundary сервер может не разобрать тело. `URLSearchParams` имеет другой формат и правила кодирования.

Сам объект JavaScript не становится JSON только от выставленного Content-Type. Отдельно проверьте поддерживаемый метод, повторное использование stream-body и серверные ограничения файлов.

### Пример и его разбор

```javascript
const data = new FormData()
data.append("title", "Документ")
// fetch("/upload", { method: "POST", body: data })
// Не добавляем вручную multipart Content-Type без boundary.
const body = JSON.stringify({ title: "Документ" })
```

`FormData` само описывает multipart-части, а браузер согласует Content-Type с boundary. Для JSON пример отдельно вызывает stringify, получая текст. Заголовок описывает формат тела, но не преобразует произвольный объект в этот формат автоматически.

### Типичная ошибка

> Передать обычный объект как body и ожидать JSON из-за одного заголовка.

### Источники

[MDN: Fetch_API/Using_Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
