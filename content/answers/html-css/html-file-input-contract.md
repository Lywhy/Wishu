**`accept` подсказывает диалогу выбора допустимые типы, но не гарантирует их безопасность.** `multiple` позволяет выбрать несколько файлов; реальное содержимое всё равно проверяют на сервере.

<!-- wishu:answer-block -->

#### Механизм и границы

- Результат доступен через files как набор `File`. Строковое `value` не является надёжным локальным путём и может содержать условный fakepath.
- Сценарий не может произвольно заполнить контрол путём к секретному файлу на диске. Сам пользователь выбирает доступные файлы; очистка поля - отдельная операция.
- Расширение и заявленный MIME-тип недостаточны для доверия. Ограничивают размер, проверяют содержимое и безопасно обрабатывают его на сервере.
- Для нативной отправки файла форма использует multipart/form-data. `accept` не определяет способ кодирования запроса.

#### Пример

```html
<form action="/documents" method="post" enctype="multipart/form-data">
  <label for="documents">PDF-документы</label>
  <input id="documents" name="documents" type="file" accept=".pdf,application/pdf" multiple />
  <button type="submit">Отправить</button>
</form>
```

#### Для закрепления

- [Как action, method, enctype и submit-кнопка определяют отправку формы?](/questions/html-native-submit-contract)

#### Источник

[MDN: file](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file).
