**Flex-direction задаёт основную ось: row следует inline-направлению, column - block-направлению.** Поперечная ось перпендикулярна основной.

<!-- wishu:answer-block -->

#### Как это работает

- В обычном horizontal-tb row обычно горизонтален, column вертикален. Но row не означает всегда «слева направо»: важен direction.
- Justify-content работает по основной оси, align-items - по поперечной. После смены row на column визуальные направления этих настроек меняются.
- Reverse меняет визуальное направление размещения, а не порядок DOM. Не используйте его для исправления смыслового порядка чтения и Tab.

#### Пример

```css
.stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.stack {
  justify-content: flex-start;
  align-items: stretch;
}
/* В обычном horizontal-tb основная ось здесь вертикальная. */
```

#### Для закрепления

- [Чем align-items, align-content и justify-content отличаются?](/questions/css-box-alignment)
- [Как управлять фокусом, не нарушая естественный порядок Tab?](/questions/html-focus-order)

#### Источник

[MDN: flex-direction](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/flex-direction).
