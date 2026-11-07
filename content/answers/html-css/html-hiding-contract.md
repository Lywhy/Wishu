Эти средства скрывают разные аспекты интерфейса. display: none убирает обычный блок из layout, visibility: hidden обычно сохраняет место, opacity: 0 делает отрисовку прозрачной, но не отключает взаимодействие.

<!-- wishu:answer-block -->

| Средство | Что важно помнить |
| --- | --- |
| hidden / display: none | Обычно исключает содержимое из отображения и дерева доступности; hidden может быть переопределён стилями |
| visibility: hidden | Место остаётся, потомки могут отдельно менять visibility |
| opacity: 0 | Фокус, клики и доступность сами по себе не отключены |
| aria-hidden="true" | Скрывает от accessibility API, а не визуально |
| inert | Делает поддерево неинтерактивным и исключает его из доступного взаимодействия |

Не оставляйте фокусируемые контролы внутри aria-hidden. Возврат aria-hidden="false" потомку не отменяет скрытие предка. Для visually hidden-подписи нужен отдельный CSS-паттерн, сохраняющий доступность.

<!-- wishu:answer-block -->

[Документация](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden).
