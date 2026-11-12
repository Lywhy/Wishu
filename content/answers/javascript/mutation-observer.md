**MutationObserver наблюдает изменения DOM: состав дочерних узлов, атрибуты и текстовые данные в соответствии с опциями.**

<!-- wishu:answer-block -->

### Как это работает

Subtree расширяет наблюдение на потомков, attributeFilter ограничивает имена атрибутов. Записи доставляются отложенно через механизм микрозадач, поэтому callback может получить пакет изменений.

Это не наблюдение произвольных переменных JavaScript или любых CSS-изменений. Если callback сам меняет наблюдаемую структуру, можно создать повторяющуюся цепочку уведомлений.

Для окончания работы используют disconnect; широкое наблюдение всего дерева без нужды может создавать лишнюю нагрузку.

### Пример и его разбор

```javascript
function watchState(element, onChange) {
  const observer = new MutationObserver(onChange)
  observer.observe(element, {
    attributes: true,
    attributeFilter: ["data-state"],
  })
  return () => observer.disconnect()
}
```

AttributeFilter ограничивает наблюдение только data-state, поэтому посторонние изменения атрибутов не создают полезной работы для этого обработчика. Возвращаемая очистка завершает наблюдение. Если onChange меняет тот же атрибут, нужно исключить повторяющийся цикл уведомлений.

### Источники

[Документация](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
