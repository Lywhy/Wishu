**Утечка возникает, когда больше не нужные данные остаются достижимыми и поэтому не освобождаются.**

<!-- wishu:answer-block -->

### Как это работает

В SPA это могут быть подписки на window, работающие таймеры, кеши без ограничения и ссылки на удалённые DOM-узлы. Удаление узла само по себе не убирает внешние ссылки.

У каждой подписки и фоновой работы должен быть владелец и момент очистки. Используют removeEventListener или signal, `clearInterval`, disconnect наблюдателей, отмену подходящих операций и ограничение кеша.

Замыкание не является утечкой само по себе: важно, кто удерживает его и какие данные через него остаются доступными.

### Пример и его разбор

```javascript
function startTracking(onResize, tick) {
  const controller = new AbortController()
  window.addEventListener("resize", onResize, { signal: controller.signal })
  const timer = setInterval(tick, 1000)
  return () => {
    controller.abort()
    clearInterval(timer)
  }
}
```

StartTracking объединяет очистку глобальной подписки и интервала. Если забыть вызвать её после закрытия экрана, оба ресурса продолжают удерживать callback и связанные данные. Проблема состоит в оставшейся достижимости, даже если сам экран уже удалён из DOM.

### Источники

[MDN: Web / Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)
