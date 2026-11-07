**form задаёт адрес, HTTP-метод и кодирование данных; активированная submit-кнопка может переопределить эти настройки.** Нативная форма умеет отправляться без fetch.

<!-- wishu:answer-block -->

#### Механизм и границы

- GET кодирует данные в URL и подходит для поиска без изменения состояния. POST обычно передаёт данные в теле. POST сам по себе не шифрует данные: нужен HTTPS.
- Для файлов используют multipart/form-data. При обычной HTML-отправке boundary формирует браузер; при `FormData` с fetch не задавайте его вручную без необходимости.
- `formaction`, `formmethod` и `formenctype` на submit-кнопке меняют параметры именно этой отправки. Метод dialog имеет отдельный смысл закрытия dialog, а не HTTP-запроса.
- Payload и валидация определяются отдельными правилами. Вложенные form недопустимы; внешнюю кнопку можно связать через `form="id"`.

#### Пример

```html
<form id="search" action="/search" method="get">
  <label for="query">Запрос</label>
  <input id="query" name="q" />
  <button type="submit">Найти</button>
</form>
<button type="submit" form="search" formaction="/advanced-search">Расширенный поиск</button>
```

#### Для закрепления

- [Какие поля попадают в данные формы и почему disabled отличается от readonly?](/questions/html-form-entry-list)
- [Что проверяет встроенная валидация формы и где нужны собственные проверки?](/questions/html-native-validation)

#### Источник

[MDN: form](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form).
