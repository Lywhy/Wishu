**break без метки завершает ближайший охватывающий цикл или switch. continue завершает текущую итерацию ближайшего цикла и переходит к следующей проверке; в обычном for перед проверкой выполняется выражение шага. continue не является командой перехода к следующему case.**

<!-- wishu:answer-block -->

### Как это работает

В switch после совпавшего case выполнение продолжается до break, `return`, `throw` или конца конструкции, включая следующие case. Это называется fallthrough и иногда используется намеренно. break внутри switch, вложенного в цикл, завершит switch, а не внешний цикл.

### Пример и его разбор

```javascript
for (const value of [1, 2, 3, 4]) {
  if (value === 2) continue
  if (value === 4) break
  console.log(value) // 1, затем 3
}
switch ("ready") {
  case "ready":
    console.log("готово")
    break
  default:
    console.log("ожидание")
}
```

При значении 2 continue пропускает вывод, но обход продолжается. При 4 break уже завершает весь ближайший цикл, поэтому выводятся только 1 и 3. В switch тот же break прекращает переход через следующие ветви. Если switch находится внутри цикла, ближайшей конструкцией для break будет именно switch, а не внешний обход.

### Источники

[MDN: Guide / Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators)
