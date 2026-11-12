**DOMContentLoaded происходит после разбора документа и выполнения deferred-классических и обычных модульных скриптов, без ожидания всех изображений и прочих ресурсов.**

<!-- wishu:answer-block -->

### Как это работает

Load страницы означает более позднее завершение загрузки зависимых ресурсов по правилам браузера. Асинхронные скрипты не задерживают DOMContentLoaded как defer.

Скрипт, подключённый поздно или динамически, может начать работу уже после события. Поэтому для инициализации проверяют document.readyState и либо ждут DOMContentLoaded, либо выполняют код сразу.

Не нужно ждать load, если задаче достаточно наличия элементов DOM.

### Пример и его разбор

```javascript
function whenDomReady(initialize) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true })
  } else {
    initialize()
  }
}
```

Проверка readyState закрывает два сценария: ранний скрипт ещё ждёт разбора, поздний уже может инициализироваться. Если всегда только подписываться на DOMContentLoaded, динамически подключённый код способен пропустить событие и вообще не выполнить инициализацию.

### Источники

[MDN: API / Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
