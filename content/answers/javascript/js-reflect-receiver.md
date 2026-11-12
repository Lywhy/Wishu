**Receiver определяет получателя для `getter`/`setter` и участвует в семантике записи. Передача только target может незаметно изменить `this` и поведение наследующего объекта или Proxy.**

<!-- wishu:answer-block -->

### Как это работает

Ловушка, возвращающая target[key], не всегда эквивалентна `Reflect.get`(target, key, receiver). В `getter` могут читаться другие поля, которые должны разрешаться через реального получателя.

Reflect помогает сохранить обычные правила, но не отменяет инварианты Proxy и ограничения внутренних слотов встроенных объектов.

### Пример и его разбор

```javascript
const proto = {
  get label() {
    return this.name
  },
}
const child = Object.create(proto)
child.name = "потомок"
console.log(Reflect.get(proto, "label", child)) // потомок
console.log(Reflect.get(proto, "label", { name: "другой" })) // другой
```

`getter` label определён на proto, но читает name у переданного receiver. Поэтому один и тот же `getter` возвращает разные строки для child и отдельного объекта. При прозрачной передаче операции через Proxy важно сохранить именно этого получателя, иначе связанные чтения начнут обращаться к другому состоянию.

### Типичная ошибка

> Использовать target[key] как универсальную прозрачную реализацию get-ловушки.

### Для закрепления

- [Как работают геттеры и сеттеры объекта?](/questions/object-accessors)
- [Чем Reflect отличается от Object и что возвращает Reflect.defineProperty?](/questions/reflect-object-operations)

### Источники

[MDN: Global_Objects/Reflect/get](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get)
