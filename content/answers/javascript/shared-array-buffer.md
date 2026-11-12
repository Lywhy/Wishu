**`SharedArrayBuffer` представляет память, доступную нескольким агентам через представления TypedArray.**

<!-- wishu:answer-block -->

### Как это работает

Передача через postMessage позволяет им работать с общими байтами, в отличие от обычной копии или передачи владения ArrayBuffer. Сам `SharedArrayBuffer` не помещают в transfer list.

Одновременная запись требует протокола синхронизации, обычно через Atomics на подходящих целочисленных представлениях. Обычное чтение и запись не заменяют согласование между потоками.

В браузере разделяемая память требует подходящего безопасного и cross-origin isolated контекста; доступность проверяют явно. Блокирующее Atomics.wait не предназначено для главного потока страницы.

### Пример и его разбор

```javascript
if (globalThis.crossOriginIsolated && typeof SharedArrayBuffer === "function") {
  const buffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT)
  const view = new Int32Array(buffer)
  Atomics.add(view, 0, 1)
  Atomics.load(view, 0) // 1 в этом примере
  // buffer можно передать Worker через postMessage без transfer list.
}
```

`TypedArray` предоставляет доступ к общему буферу, а Atomics.add изменяет выбранную ячейку атомарно. Для обмена с Worker передают сам `SharedArrayBuffer` без transfer list. Более сложное состояние требует отдельного протокола: атомарность одной ячейки не делает целую последовательность операций транзакцией.

### Источники

[MDN: Guide / Memory management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management)
