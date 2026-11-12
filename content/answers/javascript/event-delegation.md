**Target обозначает цель события с учётом правил retargeting, `currentTarget` - объект, обработчик которого выполняется сейчас.**

<!-- wishu:answer-block -->

### Как это работает

При делегировании обработчик ставят на общий контейнер и определяют нужного потомка по target. Это уменьшает число подписок и работает с добавленными позднее потомками.

Target может быть вложенным элементом кнопки, поэтому часто нужен closest с проверкой границ контейнера. `currentTarget` актуален во время обработки и не сохраняется как ссылка на контейнер для будущего `await`; нужный элемент лучше сохранить отдельно.

Делегирование зависит от распространения: остановка всплытия или особенности Shadow DOM могут изменить доступный путь.

### Пример и его разбор

```javascript
function delegate(container, onAction) {
  container.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return
    const button = event.target.closest("button[data-action]")
    if (!button || !container.contains(button)) return
    onAction(button.dataset.action)
  })
}
```

Closest позволяет найти кнопку, даже если клик пришёл по её вложенной иконке. Contains затем проверяет границу нашего контейнера, чтобы не принять внешний совпавший элемент. Благодаря одной подписке тот же обработчик работает и с кнопками, добавленными позже.

### Источники

[MDN: API / Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
