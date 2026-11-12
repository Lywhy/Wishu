**Чтение свойства ищет его в объекте и цепочке прототипов; если свойство не найдено, результат - `undefined`.**

<!-- wishu:answer-block -->

### Как это работает

Но собственное свойство с явно записанным `undefined` даёт такой же результат, поэтому сравнение obj.key !== `undefined` не доказывает отсутствие свойства. Оператор "key" in obj учитывает собственные и унаследованные свойства. `Object.hasOwn`(obj, "key") проверяет только собственное свойство, независимо от его значения.

Чтение свойства у `null` или `undefined` вызывает TypeError; optional chaining может безопасно обработать такой случай.

### Пример и его разбор

```javascript
const user = Object.create({ role: "reader" })
user.name = undefined
user.missing // undefined
"role" in user // true
Object.hasOwn(user, "role") // false
Object.hasOwn(user, "name") // true
```

У user есть собственное name со значением `undefined` и унаследованное role. Поэтому чтение несуществующего поля и существующего name само по себе не различает их наличие. Оператор in найдёт role по цепочке прототипов, а `Object.hasOwn` отклонит его как несобственное. Выбор проверки зависит от того, должны ли унаследованные поля участвовать в контракте данных.

### Источники

[MDN: Object / hasOwn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn)
