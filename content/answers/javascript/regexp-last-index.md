**`RegExp` с флагом g или y хранит позицию `lastIndex`, которая влияет на следующий test/exec.** Повторное использование такого объекта не всегда является независимой проверкой строки.

<!-- wishu:answer-block -->

### Как меняется позиция

Успешное совпадение обновляет `lastIndex` до позиции после совпадения. Неуспешный поиск у g/y сбрасывает `lastIndex` в 0.

`y` требует совпадения непосредственно в `lastIndex`; `g` может искать дальше. Для независимого boolean-теста обычно не нужен g: уберите его либо явно управляйте состоянием.

### Пример и его разбор

```javascript
const pattern = /a/g
pattern.test("a") // true; lastIndex = 1
pattern.test("a") // false; lastIndex = 0
pattern.test("a") // true

const independent = /a/
independent.test("a") // true
independent.test("a") // true
```

Первый test находит a и сдвигает `lastIndex` за совпадение. Следующая проверка начинает с позиции 1, не находит символ и сбрасывает индекс. Поэтому чередование связано с состоянием одного `RegExp`, а не с изменением входной строки.

### Типичная ошибка

> Кешировать один /g `RegExp` для валидации разных полей и ожидать независимого результата.

### Источники

[MDN: Guide / Memory management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management)
