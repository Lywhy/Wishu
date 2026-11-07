**Shorthand задаёт весь набор входящих в него свойств.** Пропущенные компоненты обычно получают начальные значения, а не сохраняют более ранние настройки.

<!-- wishu:answer-block -->

#### Механизм и границы

- `background`: red после `background-image`: url(...) сбросит изображение. `margin`: 1rem заменит все четыре стороны, а не только незаданные.
- Longhand после shorthand может уточнить один компонент, если выигрывает соответствующее сравнение каскада. Обратный порядок способен стереть уточнение.
- `font` сбрасывает связанный набор параметров, в том числе `line-height` при его отсутствии в сокращённой записи. Перед заменой длинных записей короткой смотрите контракт конкретного shorthand.

#### Пример

```css
.card {
  background-image: url("texture.png");
  background: #fff; /* background-image станет none */
  padding: 1rem;
  padding-inline-start: 2rem; /* уточнение после shorthand */
}
```

#### Для закрепления

- [Как браузер выбирает правило при конфликте CSS?](/questions/css-cascade)

#### Источник

[MDN: Shorthand properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Shorthand_properties).
