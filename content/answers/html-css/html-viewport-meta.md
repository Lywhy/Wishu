**Meta viewport помогает браузеру использовать ширину устройства как базу мобильного `layout`.** Без него страница может рассчитываться в более широком виртуальном viewport и уменьшаться целиком.

<!-- wishu:answer-block -->

#### Как это работает

- `width`=device-width и initial-scale=1 - распространённая исходная настройка. Она не делает фиксированный макет адаптивным автоматически.
- Media queries работают с CSS-размерами viewport, а не просто с физическим числом пикселей экрана.
- Не запрещайте масштабирование через user-scalable=no или жёсткий maximum-scale ради макета: это мешает чтению. Переполнение исправляют в структуре и размерах.

#### Пример

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

#### Для закрепления

- [Как работают and, запятая, not и диапазоны в media queries?](/questions/css-media-query-logic)

#### Источник

[MDN: viewport](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport).
