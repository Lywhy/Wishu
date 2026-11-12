**New.target показывает конструктор, через который началось соответствующее создание, либо `undefined` при обычном вызове подходящей функции. Reflect.construct вызывает конструктор с отдельным newTarget по заданному контракту.**

<!-- wishu:answer-block -->

### Как это работает

Это помогает понять наследование и фабрики, но не позволяет превратить любую стрелку в конструктор: target и newTarget должны поддерживать конструирование. New.target в стрелке берётся лексически из подходящего внешнего контекста.

`Object.create` создаёт объект с прототипом, но не выполняет инициализацию конструктора и не устанавливает его private slots.

### Пример и его разбор

```javascript
function Base() {
  this.createdBy = new.target.name
}
function Other() {}
const value = Reflect.construct(Base, [], Other)
console.log(Object.getPrototypeOf(value) === Other.prototype) // true
console.log(value.createdBy) // Other
```

Reflect.construct выполняет тело Base, но передаёт Other как newTarget. Поэтому созданный объект связан с Other.prototype, а new.target.name внутри Base даёт «Other». Этот пример разделяет выполняемую инициализацию и выбор прототипа. Вызов Base.call на заранее созданном объекте не воспроизводил бы такой контекст конструирования.

### Типичная ошибка

> Подменять `new` C() вызовом C.call(object), ожидая те же private-поля и new.target.

### Источники

[MDN: Operators/new.target](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target)
