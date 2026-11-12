**Onclick как DOM-свойство хранит один текущий обработчик: новое присваивание заменяет старый.**

<!-- wishu:answer-block -->

### Как это работает

AddEventListener позволяет независимые подписки и опции capture, once, passive и signal. HTML-атрибут с текстом обработчика - ещё один способ, но для поддерживаемого кода обычно удобнее явная регистрация функции.

RemoveEventListener требует ту же ссылку на функцию, тип события и совпадающий capture. Новая стрелка с тем же текстом не удалит прежнюю подписку.

Анонимный обработчик допустим, если сохранена его ссылка либо жизненный цикл управляется signal или once. Подписки на долгоживущие объекты нужно освобождать, когда они больше не нужны.

### Пример и его разбор

```javascript
function subscribe(button, onClick) {
  const controller = new AbortController()
  button.addEventListener("click", onClick, { signal: controller.signal })
  return () => controller.abort()
}
// Альтернатива: removeEventListener("click", onClick) с той же функцией.
```

`AbortController` в примере становится владельцем подписки: вызов возвращённой функции снимает обработчик через signal. Так не требуется повторно создавать функцию для удаления. Это особенно удобно при закрытии экрана, когда время жизни подписки должно закончиться вместе с ним.

### Источники

[MDN: API / Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
