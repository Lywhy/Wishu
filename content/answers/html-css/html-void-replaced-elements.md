**Пустой элемент не может иметь дочернее содержимое по синтаксису HTML. Замещаемый элемент получает отображаемое содержимое извне CSS-модели.** Эти категории отвечают на разные вопросы.

<!-- wishu:answer-block -->

#### Механизм и границы

- img, input, br и meta - пустые элементы: закрывающий тег для них не пишут. Слеш в `<img />` в text/html не создаёт отдельной XML-семантики самозакрытия.
- img - типичный замещаемый элемент: ресурс может задавать собственные размеры и пропорции. iframe тоже замещаемый, но не пустой по HTML-синтаксису.
- block и inline описывают CSS-участие в макете. `display`: block не меняет модель содержимого HTML и не разрешает вложить текст внутрь img.

#### Пример

```html
<img src="diagram.png" width="640" height="360" alt="Схема очередей" />
<br />
<iframe src="/preview" title="Предпросмотр"></iframe>
```

#### Для закрепления

- [Как aspect-ratio и object-fit решают разные задачи изображения?](/questions/css-image-fitting)
- [Почему DOM может отличаться от написанной HTML-разметки?](/questions/html-parser-content-model)

#### Источник

[MDN: Void element](https://developer.mozilla.org/en-US/docs/Glossary/Void_element).
