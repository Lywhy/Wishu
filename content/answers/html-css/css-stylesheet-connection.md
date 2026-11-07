**Link подключает внешний stylesheet, `style` содержит таблицу в документе, атрибут `style` задаёт декларации отдельному элементу.** Это разные места хранения, но они участвуют в общем каскаде.

<!-- wishu:answer-block -->

#### Как это работает

- Во внешнем файле удобно переиспользовать правила и кешировать ресурс. Встроенный `style` может задавать те же селекторы, media queries и правила.
- В атрибуте `style` нет обычного блока селектора и нельзя напрямую написать `:hover`. Внешнее правило не становится автоматически слабее только из-за отдельного файла.
- Относительные url() во внешнем `CSS` разрешаются относительно адреса CSS-файла, а не HTML-страницы. У встроенных стилей база связана с документом.

#### Пример

```html
<link rel="stylesheet" href="/styles/app.css" />
<style>
  .notice {
    color: navy;
  }
</style>
<p class="notice" style="font-weight: 600">Изменения сохранены</p>
```

#### Для закрепления

- [Чем отличаются абсолютный URL, /path, ./path и ../path?](/questions/html-relative-url-paths)
- [Как браузер выбирает правило при конфликте CSS?](/questions/css-cascade)

#### Источник

[MDN: Getting started](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Getting_started).
