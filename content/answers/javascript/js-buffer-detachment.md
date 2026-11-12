**Передача transferable `ArrayBuffer` отделяет исходный буфер: владение ресурсом переходит к получателю. Старые представления не сохраняют прежний доступ к его данным.**

<!-- wishu:answer-block -->

### Как это работает

Конкретная операция над отделённым или вышедшим за границы view может дать особые значения либо исключение согласно своему API. Не обобщайте один результат чтения индекса на все методы `DataView` и TypedArray.

`SharedArrayBuffer` не передаётся таким же способом: он описывает разделяемую память. Передача владения и одновременный общий доступ решают разные задачи.

### Пример и его разбор

```javascript
const source = new ArrayBuffer(4)
const moved = structuredClone(source, { transfer: [source] })
console.log(source.byteLength) // 0
console.log(moved.byteLength) // 4
// Старые views нельзя использовать как владельцев прежних данных.
```

Transfer перемещает владение исходной памятью, поэтому byteLength source становится нулём. У moved остаются четыре байта. Сохранённая ссылка на старый объект не сохраняет доступ к данным, и прежние представления нельзя считать продолжающими работать как до передачи.

### Типичная ошибка

> Продолжать работу со старым буфером после postMessage с transfer-list.

### Для закрепления

- [Как сделать глубокую копию через structuredClone и какие у неё ограничения?](/questions/structured-clone)
- [Как связаны ArrayBuffer, TypedArray и DataView?](/questions/typed-arrays)

### Источники

[MDN: Global_Objects/ArrayBuffer/transfer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/transfer)
