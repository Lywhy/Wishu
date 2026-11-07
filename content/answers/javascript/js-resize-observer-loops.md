**ResizeObserver наблюдает подходящие размеры элемента, которые могут меняться из-за содержимого или layout без resize окна. Это не то же самое, что MutationObserver или IntersectionObserver.**

<!-- wishu:answer-block -->

### Механизм и границы

Определите нужную box-модель. Если callback меняет размер того же наблюдаемого элемента, может возникнуть обратная связь и предупреждение о недоставленных resize-уведомлениях.

Сравнивайте желаемое значение перед записью, отделяйте измерение от изменения и выбирайте CSS/container query, если JavaScript не нужен. При завершении владельца снимайте наблюдение.

<!-- wishu:answer-block -->

### Источник

[MDN: ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).
