Aspect-ratio задаёт предпочтительное соотношение размеров коробки, а object-fit определяет, как содержимое изображения или видео размещается внутри уже выделенной области.

<!-- wishu:answer-block -->

Cover заполняет область с возможным обрезанием, contain сохраняет всё изображение с возможными свободными полосами. Object-position управляет точкой расположения. Известные width и height изображения полезны для резервирования места до загрузки.

CSS-вписывание не выбирает меньший сетевой ресурс: для этого нужны srcset/sizes или picture. Проверьте, не отрезает ли cover важную часть содержимого.

<!-- wishu:answer-block -->

[Документация](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).

<!-- wishu:answer-block -->

#### Кадрирование с выбранным фокусом

Когда обе стороны области заданы, `object-fit: cover` сохраняет пропорции ресурса, но часть изображения выходит за видимую область. `object-position` управляет размещением содержимого в этой области: это помогает сохранить лицо ближе к нужной стороне. Он не меняет координаты самой img-коробки в макете и не выбирает другой файл для загрузки. Если при разных ширинах нужен другой смысловой кадр, используйте art direction через `picture`.

```css
.portrait {
  inline-size: 12rem;
  block-size: 12rem;
  object-fit: cover;
  object-position: 50% 25%;
}
```

- [Для чего нужны srcset, sizes и размеры изображения?](/questions/html-responsive-images)
- [Как выбрать alt для информативного, декоративного и кликабельного изображения?](/questions/html-alt-purpose)

[MDN: object-position](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/object-position).
