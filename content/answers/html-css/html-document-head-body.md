**`html` содержит `head` с метаданными и `body` с основным содержимым страницы.** `title` задаёт название документа, но не заменяет видимый заголовок h1.

<!-- wishu:answer-block -->

#### Как это работает

- В `head` обычно находятся charset, viewport, `title` и подключения ресурсов. Видимый текст интерфейса размещают в `body`.
- У браузера есть правила восстановления пропущенных частей, но явная корректная структура проще для чтения и диагностики.
- `doctype` не является обычным элементом внутри `html`. Он объявляет режим документа; его назначение разобрано отдельно.

#### Пример

```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <title>Практика HTML</title>
  </head>
  <body>
    <h1>Практика HTML</h1>
    <p>Первый пример.</p>
  </body>
</html>
```

#### Для закрепления

- [Зачем нужен <!doctype html> и что меняет quirks mode?](/questions/html-doctype-mode)
- [Как браузер определяет кодировку HTML и где размещать meta charset?](/questions/html-encoding-contract)

#### Источник

[MDN: head](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/head).
