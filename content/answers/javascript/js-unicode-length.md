**Length строки считает UTF-16 code units. Итерация for...of обычно работает по code points, а пользовательский видимый символ может включать несколько code points.**

<!-- wishu:answer-block -->

### Механизм и границы

Emoji с модификаторами, ZWJ-последовательности и буква с комбинируемым знаком показывают, почему spread не является универсальным подсчётом графем. Для пользовательской сегментации предназначен Intl.Segmenter с подходящей granularity.

Выбирайте единицу измерения по задаче: протокол, позиция в JS-строке и ограничение пользовательского текста могут требовать разных единиц. Slice по code units способен разрезать суррогатную пару.

<!-- wishu:answer-block -->

### Источник

[MDN: Global_Objects/String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#utf-16_characters_unicode_code_points_and_grapheme_clusters).
