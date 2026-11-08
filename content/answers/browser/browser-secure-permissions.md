**Поддержка метода - только одно условие: API может требовать secure context, разрешение пользователя, активное действие или подходящую политику embedding.**

<!-- wishu:answer-block -->

### Механизм и границы

- Проверяйте возможность вызова и обрабатывайте отказ; не делайте вывод по userAgent.

- Требования различаются у камеры, Clipboard и fullscreen. Отказ не обязательно означает отсутствие поддержки.

### Сценарий

Метод Clipboard существует, но вызов из неподходящего контекста не получает разрешение.

### Типичная ошибка

Считать typeof method === "function" достаточной гарантией успеха.

### Для закрепления

- [Почему Clipboard, fullscreen и похожие API могут отказать даже при наличии метода?](/questions/js-browser-activation)

### Источники

- [Secure contexts](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Secure_Contexts)
