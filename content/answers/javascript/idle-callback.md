**`requestIdleCallback` планирует невысокоприоритетную работу на свободное время главного потока.**

<!-- wishu:answer-block -->

### Как это работает

Deadline.timeRemaining сообщает доступный бюджет, didTimeout - запуск по истечении заданного timeout. Большую работу нужно дробить и прекращать, когда бюджет исчерпан.

Поддержка API не универсальна, поэтому нужен выбор по возможностям и подходящий fallback. Без timeout важная работа может долго не начаться; при срабатывании timeout свободного времени всё равно может не быть.

Callback не выполняется в другом потоке. Для необходимых визуальных изменений лучше согласовать работу через requestAnimationFrame.

### Пример и его разбор

```javascript
function deferOptional(work) {
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(work, { timeout: 1000 })
    return () => window.cancelIdleCallback(id)
  }
  const id = setTimeout(() => work(null), 0)
  return () => clearTimeout(id)
}
// work учитывает бюджет; fallback не предоставляет IdleDeadline.
```

Fallback сохраняет возможность отложить работу, но передаёт `null` вместо IdleDeadline. Поэтому work должен поддерживать оба контракта. Timeout ограничивает ожидание запуска, однако не означает, что тяжёлый callback внезапно перестанет мешать вводу и отрисовке.

### Источники

[MDN: Web / Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)
