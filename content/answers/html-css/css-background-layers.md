**Первый `background-image` рисуется поверх следующих.** `cover` заполняет область с возможным обрезанием, `contain` вписывает изображение целиком, оставляя незаполненное место.

<!-- wishu:answer-block -->

#### Механизм и границы

- Размер и позицию можно задать для каждого слоя. `background-color` находится под изображениями; в shorthand цвет допускается только в последнем слое.
- Фон не создаёт доступного alt и не задаёт размер контейнера из естественных размеров картинки. Важное содержимое лучше представить img с подходящей альтернативой.
- Cover сохраняет пропорции, а не растягивает изображение независимо по двум осям. Выбор области и `background-position` определяет, какая часть будет видна.

#### Пример

```css
.cover {
  min-block-size: 16rem;
  background:
    linear-gradient(transparent, rgb(0 0 0 / 0.7)),
    url("cover.jpg") center / cover no-repeat #222;
}
```

#### Для закрепления

- [Как aspect-ratio и object-fit решают разные задачи изображения?](/questions/css-image-fitting)

#### Источник

[MDN: background](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background).
