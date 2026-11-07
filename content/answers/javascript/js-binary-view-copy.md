**Subarray создаёт представление на тот же буфер, а slice копирует выбранные элементы в новый буфер по своему контракту. Изменения через общее представление видны другим владельцам той же памяти.**

<!-- wishu:answer-block -->

### Механизм и границы

Небольшой subarray может удерживать весь большой ArrayBuffer. Для независимого хранения иногда нужна копия, даже если срез выглядит дешёвым.

Не переносите правила обычного Array или серверного Buffer на все бинарные контейнеры: у них могут быть другие методы и соглашения.

<!-- wishu:answer-block -->

### Для закрепления

- [Как связаны ArrayBuffer, TypedArray и DataView?](/questions/typed-arrays)

<!-- wishu:answer-block -->

### Источник

[MDN: Global_Objects/TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray).
