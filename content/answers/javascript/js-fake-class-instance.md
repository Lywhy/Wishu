**`Object.create` устанавливает прототип, но не вызывает конструктор и не создаёт private-состояние экземпляра. Поэтому `instanceof` может дать `true`, хотя методы не смогут работать с таким объектом.**

<!-- wishu:answer-block -->

### Как это работает

Та же разница важна при десериализации: присвоение прототипа parsed JSON не восстанавливает все инварианты класса. Нужна фабрика или конструктор, который проверяет и создаёт необходимые данные.

Проверка принадлежности прототипной цепочке не является универсальным валидатором состояния.

### Пример и его разбор

```javascript
class Counter {
  #value = 1
  read() {
    return this.#value
  }
}
const fake = Object.create(Counter.prototype)
console.log(fake instanceof Counter) // true
// fake.read() // TypeError: private brand не установлен.
```

Fake находится в нужной прототипной цепочке, поэтому `instanceof` возвращает true. Однако конструктор Counter не выполнялся и #value не создано. Вызов read обнаруживает это различие через private brand-check, показывая границы проверки только по прототипу.

### Типичная ошибка

> Восстанавливать экземпляр класса одной заменой **proto** после JSON.parse.

### Источники

[MDN: Classes/Private_elements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements)
