**Относительный URL разрешается относительно base URL документа или явно указанной базы.**

<!-- wishu:answer-block -->

### Механизм и границы

- Начальный / означает корень origin, а путь без него зависит от текущего базового каталога. Элемент base может изменить разрешение многих ссылок.

- Для построения адресов используйте URL API; склейка строк легко теряет slash, query или кодирование.

### Сценарий

new URL("images/a.png", "https://example.com/docs/") даёт ресурс под /docs/images/.

### Типичная ошибка

Считать ссылку relative к папке исходного React-компонента.

### Для закрепления

- [Как location и History API управляют навигацией?](/questions/history-location)

### Источники

- [URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL)
