**Прототип - объект или `null` во внутренней связи [[Prototype]] другого объекта.**

<!-- wishu:answer-block -->

### Как это работает

При чтении обычного свойства сначала проверяются собственные свойства. Если совпадения нет, поиск идёт по прототипу и далее до найденного свойства или завершения цепочки на `null`.

Если свойство не найдено, возвращается `undefined`. Прототипное наследование не копирует свойства родителя в потомка.

Собственное одноимённое свойство затеняет унаследованное, а после его удаления снова может быть видно значение прототипа. Даже собственное значение `undefined` останавливает поиск. in учитывает цепочку, `Object.hasOwn` - только сам объект; прототип можно узнать через `Object.getPrototypeOf`.

### Пример и его разбор

```javascript
const parent = { role: "reader" }
const child = Object.create(parent)
child.role // "reader"
Object.hasOwn(child, "role") // false
child.role = "editor"
child.role // "editor": собственное свойство
delete child.role
child.role // "reader"
Object.getPrototypeOf(child) === parent // true
```

При чтении сначала проверяется сам объект, затем его прототипы. Собственный role скрывает одноимённое поле родителя, а удаление собственного поля снова делает видимым наследуемое значение. Даже собственное значение `undefined` останавливает поиск: отсутствие свойства и свойство с таким значением имеют разную семантику.

### Источники

[MDN: Guide / Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain)
