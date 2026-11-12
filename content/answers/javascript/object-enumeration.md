**`Object.keys`(obj) возвращает массив ключей, `Object.values`(obj) - значений, `Object.entries`(obj) - пар [key, value].**

<!-- wishu:answer-block -->

### Как это работает

Все три метода учитывают только собственные перечисляемые свойства со строковыми ключами: унаследованные, неперечисляемые и символьные свойства не попадают в результат. Для обычных объектов индексные ключи перечисляются по возрастанию, остальные строковые - в порядке добавления.

Values и entries читают значения и могут вызвать getter. `Reflect.ownKeys` нужен, когда требуются все собственные ключи, включая символы и неперечисляемые; он не возвращает сами значения или дескрипторы.

### Пример и его разбор

```javascript
const token = Symbol("token")
const user = { name: "Аня", age: 25, [token]: 1 }
Object.keys(user) // ["name", "age"]
Object.values(user) // ["Аня", 25]
Object.entries(user) // [["name", "Аня"], ["age", 25]]
Reflect.ownKeys(user) // ["name", "age", token]
```

Выбор API зависит от того, какие именно свойства нужно увидеть. Keys, values и entries дают представление собственных перечисляемых строковых полей, поэтому символьный token в эти результаты не попадает. `Reflect.ownKeys` возвращает и его. Ни один такой список сам по себе не означает обход всей цепочки прототипов.

### Источники

[MDN: Guide / Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)
