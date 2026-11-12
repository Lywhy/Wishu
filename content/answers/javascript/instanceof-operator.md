**Обычно value `instanceof` Constructor проверяет, встречается ли Constructor.prototype в цепочке прототипов value.**

<!-- wishu:answer-block -->

### Как это работает

Поэтому это проверка связи с прототипом конструктора, а не универсальное определение типа. Поведение можно изменить через `Symbol.hasInstance`.

Объекты из другого контекста, например iframe, могут иметь другие встроенные конструкторы, и `instanceof` Array для такого массива даст false. Для массива надёжнее `Array.isArray`.

Изменение цепочки прототипов также может изменить результат instanceof. Проверка error `instanceof` Error полезна внутри одного realm, но может дать `false` для ошибки из другого окна или контекста.

Она не доказывает, что произвольные внешние данные являются доверенной ошибкой с нужным контрактом.

### Пример и его разбор

```javascript
class User {}
const user = new User()
user instanceof User // true
user instanceof Object // true
;[] instanceof Array // true
Array.isArray([]) // true
```

Экземпляр User связан с User.prototype, а дальше цепочка обычно ведёт к Object.prototype, поэтому обе проверки дают true. Проверка массива через `Array.isArray` отвечает на иной вопрос и не зависит от совпадения конструктора Array между окнами. `instanceof` полезен для известной иерархии, но не заменяет проверку структуры произвольных данных.

### Источники

[MDN: Guide / Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators)
