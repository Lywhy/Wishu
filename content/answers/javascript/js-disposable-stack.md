**DisposableStack объединяет ресурсы и cleanup-callback в один управляемый стек. Он освобождает их в обратном порядке, что удобно для последовательного получения взаимозависимых ресурсов.**

<!-- wishu:answer-block -->

### Механизм и границы

Use принимает совместимый ресурс, adopt связывает значение с освобождающей функцией, defer добавляет действие. Move передаёт ответственность новому стеку по своему контракту. Для асинхронного варианта предназначен отдельный API.

Если ошибки возникают и в основном завершении, и при очистке, explicit resource management может представлять их через SuppressedError. Нельзя просто потерять исходную причину последним catch.

<!-- wishu:answer-block -->

### Источник

[MDN: Global_Objects/DisposableStack](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DisposableStack).
