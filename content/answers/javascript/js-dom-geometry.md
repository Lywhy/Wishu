**BoundingClientRect даёт геометрию относительно viewport с учётом соответствующих преобразований. Client/offset/scroll-метрики описывают другие размеры: внутреннюю область, внешнюю layout-коробку или extent содержимого.**

<!-- wishu:answer-block -->

### Как это работает

Проверьте, включаются ли border, padding и scrollbar у нужной метрики. Rect может содержать дробные значения, а отдельные layout-метрики округляются. Для документа и viewport есть особые случаи.

Не смешивайте client-координаты события с page-координатами без перевода. Чередование DOM-записи и чтения геометрии может потребовать повторного layout.

### Пример и его разбор

```javascript
function measure(element) {
  const rect = element.getBoundingClientRect()
  return {
    topInViewport: rect.top,
    visibleBox: element.clientHeight,
    content: element.scrollHeight,
  }
}
// Выбор величины определяется задачей, а не похожим названием.
```

Measure намеренно возвращает разные величины: положение относительно viewport, внутреннюю высоту и высоту содержимого. Для определения переполнения сравнивают согласованные метрики, а для координат всплывающего блока выбирают подходящую систему отсчёта. Их значения не обязаны совпадать.

### Типичная ошибка

> Сравнивать разные метрики как будто они обязаны совпасть до пикселя.

### Источники

[MDN: Element/getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
