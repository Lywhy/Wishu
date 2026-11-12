**`stopPropagation` прекращает дальнейшее распространение по пути, но не отменяет действие браузера и не останавливает другие обработчики на том же объекте.**

<!-- wishu:answer-block -->

### Как это работает

Для последних есть stopImmediatePropagation. `preventDefault` отменяет действие по умолчанию, например переход ссылки или отправку формы, если событие cancelable.

Отменять нужно до завершения синхронной обработки, а не после await. В passive-обработчике `preventDefault` не сработает.

Для формы обычно слушают submit самой формы, чтобы учитывать и кнопку, и отправку с клавиатуры; `return` `false` из callback addEventListener не заменяет preventDefault.

### Пример и его разбор

```javascript
function interceptForm(form, onSubmit) {
  form.addEventListener("submit", (event) => {
    event.preventDefault()
    onSubmit(new FormData(form))
  })
}
```

Форма перехватывает submit, поэтому решение работает и при отправке с клавиатуры. `preventDefault` вызывается сразу, после чего приложение получает `FormData` и выполняет собственную отправку. `stopPropagation` здесь не заменил бы отмену стандартной навигации браузера.

### Источники

[MDN: API / Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
