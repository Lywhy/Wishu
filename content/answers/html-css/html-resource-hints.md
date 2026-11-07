Preload заранее запрашивает нужный для текущей страницы ресурс, prefetch подсказывает возможную будущую потребность, preconnect заранее подготавливает соединение с origin. Эти подсказки не исполняют сценарий и не применяют CSS сами по себе.

<!-- wishu:answer-block -->

Для preload согласуйте as, URL, тип ресурса и CORS-режим с последующим использованием, иначе браузер может выполнить лишнюю загрузку. Шрифт часто требует crossorigin даже при загрузке с вашего origin.

Не объявляйте всё критическим: подсказки конкурируют за сеть. Для ESM-графа существует modulepreload. Эффект оценивают в сетевом профиле и по метрикам страницы, а не по числу добавленных link.

<!-- wishu:answer-block -->

[Документация](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preload).

<!-- wishu:answer-block -->

#### Fetchpriority не заменяет preload и loading

Preload заранее обнаруживает нужный ресурс; fetchpriority подсказывает относительную важность уже выбранной загрузки; loading="lazy" меняет момент допустимого начала для поддерживаемых элементов. Подсказка high не гарантирует точный порядок и не оправдывает приоритет всех картинок. Для вероятного LCP-изображения сохраняют раннее обнаружение и не откладывают его lazy-loading.

```html
<img src="hero.webp" width="1200" height="600" fetchpriority="high" alt="Схема программы курса" />
```

- [Для чего нужны srcset, sizes и размеры изображения?](/questions/html-responsive-images)
- [Как по Network waterfall понять причину медленной загрузки?](/questions/network-waterfall)

[MDN: img](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#fetchpriority).
