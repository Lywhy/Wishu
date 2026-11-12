**Static-метод может наследоваться как обычное свойство конструктора, но private static-поле принадлежит конкретному объявившему его классу. `this` при вызове через наследника может указывать уже на другой конструктор.**

<!-- wishu:answer-block -->

### Как это работает

Чтение this.#field из такого вызова может не пройти brand-check. Если намерение - всегда читать поле базового класса, нужно явно выбрать этот класс, а не предполагать универсальный полиморфизм private static.

Отличайте наследование public-членов, доступность private-имени в лексическом коде и фактический бренд receiver.

### Пример и его разбор

```javascript
class Base {
  static #value = 1
  static read() {
    return this.#value
  }
}
class Child extends Base {}
console.log(Base.read()) // 1
// Child.read() // TypeError: this - Child, private static-поле у Base.
```

Base.read выполняется с `this`, равным Base, и успешно читает поле. При Child.read тот же код получает Child, которому приватный static-элемент не принадлежит. Лексическая доступность имени в методе не отменяет проверку фактического получателя.

### Типичная ошибка

> Считать private static обычным наследуемым data-свойством.

### Для закрепления

- [Как работают #приватные элементы и доступны ли они подклассу?](/questions/class-private-elements)
- [Где находятся static-поля и как вызывать статический метод?](/questions/class-static)

### Источники

[MDN: Classes/Private_elements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements)
