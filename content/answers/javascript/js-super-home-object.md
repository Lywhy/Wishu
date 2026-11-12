**Super в методе связан с home object, где метод был определён. Перенос ссылки на метод в другой объект не переопределяет эту связь, хотя `this` при вызове может измениться.**

<!-- wishu:answer-block -->

### Как это работает

Поэтому вызов super.method нельзя понимать как универсальное this.**proto**.method. Важны и исходное определение метода, и текущий receiver.

Копирование методов через `Object.assign` не создаёт автоматически новую семантику super. Обычная функция, присвоенная полю без подходящего метода определения, не получает такое же разрешение super.

### Пример и его разбор

```javascript
const parent = {
  read() {
    return this.name
  },
}
const source = {
  __proto__: parent,
  read() {
    return super.read()
  },
}
const target = { name: "другой", read: source.read }
console.log(target.read()) // другой: родитель найден через home object, this - target.
```

Метод был определён в source, поэтому родитель для super находится через source даже после переноса ссылки. При этом вызов target.read передаёт target как `this`, и parent.read читает его name. Поиск метода и выбор получателя здесь происходят по разным правилам.

### Типичная ошибка

> Копировать метод с super и ожидать, что он автоматически станет наследовать новый прототип назначения.

### Для закрепления

- [Как extends и super связывают классы?](/questions/class-inheritance-super)
- [От чего зависит this внутри функции?](/questions/function-this)

### Источники

[MDN: Operators/super](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super)
