**getBoundingClientRect даёт снимок геометрии, а не подписку на изменения.** Размер может измениться из-за содержимого или контейнера без события resize окна.

<!-- wishu:answer-block -->

### Как это работает

- Для наблюдения за размером элемента подключайте `ResizeObserver` и отключайте его в cleanup.

- Выберите требуемую метрику: contentRect описывает область содержимого, а getBoundingClientRect также зависит от border и преобразований. Не смешивайте их без осознанного контракта.

- Не создавайте цикл, в котором обработчик меняет размер наблюдаемого элемента, вызывая сам себя. Обновляйте state только при значимом изменении и учитывайте отсутствие DOM при SSR.

### Пример

```jsx
useEffect(() => {
  const node = elementRef.current
  if (!node) return
  const observer = new ResizeObserver(([entry]) => {
    setWidth(entry.contentRect.width)
  })
  observer.observe(node)
  return () => observer.disconnect()
}, [])
// Пример предполагает стабильный узел на всё время mount.
```

### Типичная ошибка

Оставить [] при динамической замене самого DOM-узла и продолжать наблюдать уже удалённый элемент.

### Источники

- [MDN: API / ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
