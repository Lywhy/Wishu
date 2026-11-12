**IntersectionObserver сообщает об изменениях пересечения элемента с viewport или заданным root.**

<!-- wishu:answer-block -->

### Как это работает

Threshold задаёт пороги доли пересечения, rootMargin корректирует границы наблюдения. Это подходит для отложенной загрузки, появления блоков и триггеров бесконечного списка.

Наблюдение асинхронное и не является точным счётчиком каждого пикселя или доказательством, что пользователь реально увидел элемент. Из одной геометрии нельзя вывести отсутствие перекрытия другим окном.

После использования вызывают unobserve для цели или disconnect для всего наблюдателя.

### Пример и его разбор

```javascript
function watchVisible(element, onVisible) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onVisible(entry.target)
      }
    },
    { threshold: 0.25 },
  )
  observer.observe(element)
  return () => observer.disconnect()
}
```

Observer следит за пересечением, а проверка isIntersecting выбирает уведомления о входе в область. Threshold задаёт точки уведомлений, но не делает callback непрерывным измерителем видимости. Если действие нужно выполнить один раз, после него отдельно прекращают наблюдение цели.

### Источники

[MDN: API / Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
