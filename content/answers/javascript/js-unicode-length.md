**`length` строки считает UTF-16 code units. Итерация for...of обычно работает по code points, а пользовательский видимый символ может включать несколько code points.**

<!-- wishu:answer-block -->

### Как это работает

Emoji с модификаторами, ZWJ-последовательности и буква с комбинируемым знаком показывают, почему spread не является универсальным подсчётом графем. Для пользовательской сегментации предназначен `Intl.Segmenter` с подходящей granularity.

Выбирайте единицу измерения по задаче: протокол, позиция в JS-строке и ограничение пользовательского текста могут требовать разных единиц. `slice` по code units способен разрезать суррогатную пару.

### Пример и его разбор

```javascript
const text = "😀"
console.log(text.length) // 2
console.log([...text].length) // 1
const segmenter = new Intl.Segmenter("ru", { granularity: "grapheme" })
const visible = [...segmenter.segment("е\u0301")].length // 1
```

Emoji занимает две единицы UTF-16, но один code point. Для буквы с комбинируемым знаком даже число code points не равно числу видимых символов, поэтому пример использует сегментацию графем. Выбор `length` или Segmenter должен следовать единице измерения в требованиях.

### Типичная ошибка

> Ограничивать видимые символы через `length` или считать spread готовым Unicode-редактором.

### Источники

[MDN: Global_Objects/String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#utf-16_characters_unicode_code_points_and_grapheme_clusters)
