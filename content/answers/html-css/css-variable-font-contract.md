**Variable `font` содержит диапазоны изменений в одном ресурсе.** Для стандартных осей предпочтительны `font-weight`, `font-stretch` и `font-style`; `font-variation-settings` нужен для низкоуровневого управления.

<!-- wishu:answer-block -->

#### Механизм и границы

- Шрифт должен реально поддерживать нужную ось и диапазон. Объявление `font-weight`: 100 900 у `@font-face` описывает диапазон имеющегося файла, а не создаёт его.
- `wght` - стандартная ось веса. Низкоуровневая настройка может переопределить соответствующее высокоуровневое свойство; не дублируйте два источника управления без причины.
- Если нужного начертания нет, браузер может синтезировать его. `font-synthesis` позволяет ограничить синтез, но не загружает отсутствующий настоящий italic.
- Один variable-файл не всегда меньше пары реально используемых статических файлов. Выбор проверяют по нужным начертаниям и бюджету загрузки.

#### Пример

```css
@font-face {
  font-family: "Study Variable";
  src: url("study-variable.woff2") format("woff2");
  font-weight: 100 900;
  font-style: normal;
}
h2 {
  font-family: "Study Variable", sans-serif;
  font-weight: 650;
}
```

#### Для закрепления

- [Как загрузка веб-шрифта влияет на текст и сдвиги макета?](/questions/css-font-loading)

#### Источник

[MDN: Variable fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Fonts/Variable_fonts).
