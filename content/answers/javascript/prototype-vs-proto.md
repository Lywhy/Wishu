**[[Prototype]] - внутренняя связь объекта с прототипом. **proto** обычно означает унаследованный accessor из `Object.prototype`, который читает или меняет эту связь.**

<!-- wishu:answer-block -->

### Как это работает

Он может отсутствовать или быть затенён собственным свойством, поэтому надёжнее `Object.getPrototypeOf` и, если изменение необходимо, `Object.setPrototypeOf`. Запись **proto**: proto в литерале - отдельная специальная форма задания прототипа.

Constructor.prototype - обычное свойство конструктора, используемое `new` как прототип создаваемого экземпляра, если его значение - объект. Это не прототип самой функции-конструктора: у неё есть своя внутренняя связь [[Prototype]].

Замена Constructor.prototype не меняет прототип уже созданных экземпляров. Стрелочные функции конструкторами не являются.

### Пример и его разбор

```javascript
function User() {}
const user = new User()
Object.getPrototypeOf(user) === User.prototype // true
Object.getPrototypeOf(User) === Function.prototype // true
const oldPrototype = User.prototype
User.prototype = { role: "reader" }
Object.getPrototypeOf(user) === oldPrototype // true
```

Свойство User.prototype используется для прототипа экземпляров, созданных через `new` User. У самой функции User тоже есть прототип, обычно Function.prototype, но это другая связь. Замена User.prototype влияет на последующие экземпляры и не перестраивает цепочку объектов, которые уже были созданы.

### Источники

[MDN: Guide / Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)
