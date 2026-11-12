**Объект можно создать литералом {}, через `Object.create`(prototype) или вызовом конструктора с new.**

<!-- wishu:answer-block -->

### Как это работает

Литерал удобен для обычных данных; `Object.create` задаёт прототип явно, в том числе `null`. Класс описывает конструктор и методы экземпляров.

При обычном вызове конструктора через `new` создаётся объект с прототипом Constructor.prototype, а `this` конструктора указывает на него. Если конструктор явно возвращает объект, результатом становится этот объект; возвращаемый примитив обычно игнорируется.

Классы требуют `new`, а стрелочные функции нельзя вызывать как конструкторы.

### Пример и его разбор

```javascript
const literal = { name: "Аня" }
const dictionary = Object.create(null)
class User {
  constructor(name) {
    this.name = name
  }
}
const user = new User("Оля")
Object.getPrototypeOf(user) === User.prototype // true
```

Литерал сразу задаёт свойства, `Object.create`(`null`) создаёт словарь без обычного прототипа, а `new` User запускает предусмотренную конструктором инициализацию. Последняя проверка показывает установленную связь с User.prototype. Одинаковое наличие поля name ещё не означает одинаковый способ создания: методы, приватные элементы и другие гарантии зависят от конкретного конструктора.

### Источники

[MDN: Guide / Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators)
