**EncodeURI сохраняет ряд структурных разделителей URL, а encodeURIComponent подходит для отдельной компоненты. При вставке пользовательского значения в query символ & не должен случайно стать новым параметром.**

<!-- wishu:answer-block -->

### Механизм и границы

Для построения URL часто надёжнее URL и URLSearchParams, которые явно представляют структуру. Не кодируйте всю уже собранную строку повторно без причины: получится двойное кодирование.

URL-кодирование не делает строку безопасной для любого HTML/JavaScript-контекста и не проверяет разрешённую схему URL. Ошибочные escape-последовательности при decode могут вызвать исключение.

<!-- wishu:answer-block -->

### Источник

[MDN: Global_Objects/encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent).
