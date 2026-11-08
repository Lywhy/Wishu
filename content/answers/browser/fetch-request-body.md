**Формат тела выбирают по контракту API: JSON, `FormData`, бинарные данные или иной поддерживаемый тип.**

<!-- wishu:answer-block -->

### Механизм и границы

- Для JSON нужна сериализация и согласованный `Content-Type`. Для `FormData` браузер сам согласует multipart boundary.

- GET/HEAD в Fetch не получают body; поля URL и отправляемое содержимое имеют разные ограничения и видимость.

### Сценарий

Отправка File через `FormData` отличается от строки с его именем или от JSON с объектом File.

### Типичная ошибка

Сериализовать произвольный File через JSON и ожидать передачу байтов файла.

### Для закрепления

- [Как multipart/form-data передаёт поля и файлы?](/questions/http-multipart-boundary)

### Источники

- [Использование Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
