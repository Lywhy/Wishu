**BoundingClientRect даёт геометрию относительно viewport с учётом соответствующих преобразований. Client/offset/scroll-метрики описывают другие размеры: внутреннюю область, внешнюю layout-коробку или extent содержимого.**

<!-- wishu:answer-block -->

### Механизм и границы

Проверьте, включаются ли border, padding и scrollbar у нужной метрики. Rect может содержать дробные значения, а отдельные layout-метрики округляются. Для документа и viewport есть особые случаи.

Не смешивайте client-координаты события с page-координатами без перевода. Чередование DOM-записи и чтения геометрии может потребовать повторного layout.

<!-- wishu:answer-block -->

### Источник

[MDN: Element/getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect).
