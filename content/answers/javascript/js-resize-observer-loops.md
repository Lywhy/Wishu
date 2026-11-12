**ResizeObserver наблюдает подходящие размеры элемента, которые могут меняться из-за содержимого или layout без resize окна. Это не то же самое, что MutationObserver или IntersectionObserver.**

<!-- wishu:answer-block -->

### Как это работает

Определите нужную box-модель. Если callback меняет размер того же наблюдаемого элемента, может возникнуть обратная связь и предупреждение о недоставленных resize-уведомлениях.

Сравнивайте желаемое значение перед записью, отделяйте измерение от изменения и выбирайте CSS/container query, если JavaScript не нужен. При завершении владельца снимайте наблюдение.

### Пример и его разбор

```javascript
const observer = new ResizeObserver((entries) => {
  for (const entry of entries) console.log(entry.contentRect.width)
})
// observer.observe(element)
// При завершении: observer.disconnect()
```

Callback читает размер каждого элемента из доставленного набора entries. Если на основании ширины он назначает новую ширину той же цели, получается обратная связь. Перед записью нужно проверить необходимость изменения и исключить бесконечное чередование размеров.

### Типичная ошибка

> Считать любое изменение DOM изменением размера или менять width на каждом уведомлении без проверки.

### Источники

[MDN: ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
