**Передача transferable ArrayBuffer отделяет исходный буфер: владение ресурсом переходит к получателю. Старые представления не сохраняют прежний доступ к его данным.**

<!-- wishu:answer-block -->

### Механизм и границы

Конкретная операция над отделённым или вышедшим за границы view может дать особые значения либо исключение согласно своему API. Не обобщайте один результат чтения индекса на все методы DataView и TypedArray.

SharedArrayBuffer не передаётся таким же способом: он описывает разделяемую память. Передача владения и одновременный общий доступ решают разные задачи.

<!-- wishu:answer-block -->

### Для закрепления

- [Как сделать глубокую копию через structuredClone и какие у неё ограничения?](/questions/structured-clone)
- [Как связаны ArrayBuffer, TypedArray и DataView?](/questions/typed-arrays)

<!-- wishu:answer-block -->

### Источник

[MDN: Global_Objects/ArrayBuffer/transfer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/transfer).
