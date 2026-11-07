**Абсолютный URL содержит собственную схему и адрес, /path начинается от корня origin, ./path и ../path разрешаются относительно каталога базового URL.** Путь не вычисляется относительно папки компонента React.

<!-- wishu:answer-block -->

#### Как это работает

- При странице https://example.com/docs/topic/ ссылка ./intro ведёт в /docs/topic/intro, ../intro - в /docs/intro, а /intro - в корень сайта.
- Завершающий слеш имеет значение: у URL /docs/topic без слеша последний сегмент обычно заменяется при разрешении относительного пути.
- Элемент base может изменить базу документа. В `CSS` относительный url() внешнего stylesheet имеет собственную базу - адрес этого stylesheet.

#### Пример

```html
<!-- Базовый URL: https://example.com/docs/topic/ -->
<a href="./intro">В этом каталоге</a>
<a href="../intro">На уровень выше</a>
<a href="/intro">От корня origin</a>
```

#### Для закрепления

- [Как base влияет на относительные URL и ссылки с #fragment?](/questions/html-base-url)

#### Источник

[MDN: Resolving relative references](https://developer.mozilla.org/en-US/docs/Web/API/URL_API/Resolving_relative_references).
