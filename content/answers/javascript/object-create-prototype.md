**`Object.create`(proto) создаёт новый объект с указанным внутренним прототипом без вызова конструктора.**

<!-- wishu:answer-block -->

### Как это работает

Свойства proto не копируются: они доступны через цепочку наследования. Необязательный второй аргумент - карта дескрипторов собственных свойств, а не обычных значений.

`Object.create`(`null`) создаёт объект без прототипа: он не наследует `toString`, hasOwnProperty и accessor **proto** из `Object.prototype`. Это удобно для простого словаря строковых или символьных ключей без унаследованных имён.

Проверять свойства можно через `Object.hasOwn`, а прототип - через `Object.getPrototypeOf`. Для произвольных типов ключей и готового API коллекции часто удобнее Map.

### Пример и его разбор

```javascript
const parent = { role: "reader" }
const child = Object.create(parent)
child.role // "reader"
Object.hasOwn(child, "role") // false
const dictionary = Object.create(null)
dictionary.toString // undefined
dictionary["toString"] = "своё значение"
Object.getPrototypeOf(dictionary) // null
```

Create связывает новый объект с переданным прототипом, не вызывая функцию-конструктор. Поэтому role доступно при чтении, хотя собственного поля у потомка ещё нет. Вариант с `null` убирает наследуемые методы: он удобен для словаря, но, например, вызов dictionary.toString уже нельзя считать доступным по умолчанию.

### Источники

[MDN: Guide / Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)
