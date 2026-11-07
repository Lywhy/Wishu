**Атрибутные селекторы проверяют разные отношения к строке значения.** ~= ищет отдельное слово в списке, *= - произвольную подстроку; это не одно и то же.

<!-- wishu:answer-block -->

#### Механизм и границы

- [data-state] проверяет наличие, [data-state="open"] - точное значение. ^= и $= проверяют начало и конец строки.
- [class~="active"] проверяет отдельный токен класса и не совпадёт с inactive. [class*="active"] может совпасть с обоими.
- Чувствительность к регистру зависит от атрибута и языка документа. Флаг i явно задаёт ASCII-регистронезависимое сравнение; для data-* не полагайтесь на неявное приведение регистра.

#### Пример

```css
[data-state="open"] {
  border-style: solid;
}
[rel~="external"] {
  text-decoration: underline;
}
[href$=".pdf" i] {
  font-weight: bold;
}
```

#### Источник

[MDN: Attribute selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Attribute_selectors).
