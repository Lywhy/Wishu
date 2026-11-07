**В обычном блочном потоке ограничьте ширину и задайте auto для inline-margin.** Если блок уже занимает всё доступное место, распределять по сторонам нечего.

<!-- wishu:answer-block -->

#### Как это работает

- `max-inline-size` с шириной, не превышающей контейнер, позволяет получить центрированный текстовый столбец на широком экране.
- `text-align`: center центрирует inline-содержимое внутри коробки, но не сам блочный контейнер.
- Вертикальные auto-margin в обычном блочном потоке не воспроизводят центрирование Flexbox. Выбирайте способ под layout-контекст.

#### Пример

```css
.article {
  inline-size: calc(100% - 2rem);
  max-inline-size: 60rem;
  margin-inline: auto;
}
```

#### Для закрепления

- [Как auto margin во Flexbox взаимодействует с gap и justify-content?](/questions/css-auto-margin-gap)
- [Как width, min-width и max-width разрешают конфликт размеров?](/questions/css-size-constraints)

#### Источник

[MDN: margin](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/margin).
