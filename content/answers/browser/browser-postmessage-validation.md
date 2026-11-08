**Получатель проверяет origin, ожидаемый source и схему сообщения, а отправитель задаёт точный targetOrigin, когда он известен.**

<!-- wishu:answer-block -->

### Механизм и границы

- Наличие window-ссылки не гарантирует, что после навигации там по-прежнему доверенный документ.

- Не превращайте произвольное сообщение в HTML, команду или подтверждение авторизации. Оpaque origin требует отдельного ограниченного протокола.

### Сценарий

Платёжный iframe передаёт результат только по ожидаемому контракту с проверкой origin и идентификатора операции.

```javascript
// expectedWindow - contentWindow известного iframe.
window.addEventListener("message", (event) => {
  if (event.origin !== "https://widget.example.com") return
  if (event.source !== expectedWindow) return
  const message = event.data
  if (!message || typeof message !== "object") return
  if (message.type !== "ready" || message.version !== 1) return
  // Обработать только разрешённое сообщение.
})
```

### Типичная ошибка

Доверять одному полю success или любому сообщению из message-listener.

### Источники

- [window.postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
