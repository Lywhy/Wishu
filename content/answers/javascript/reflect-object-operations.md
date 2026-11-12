**Reflect - объект со статическими методами для операций вроде чтения, записи, определения свойств и работы с прототипом.**

<!-- wishu:answer-block -->

### Как это работает

Он не является конструктором. У Object есть другая роль и набор утилит; это не две взаимозаменяемые версии одного API.

Например, `Reflect.ownKeys` возвращает все собственные строковые и символьные ключи, а `Object.keys` - только перечисляемые строковые. `Object.defineProperty` возвращает объект и выбрасывает TypeError, если операция не может быть выполнена.

`Reflect.defineProperty` при обычном отказе определения возвращает `false`, при успехе - true. Это удобно в Proxy-ловушках, контракт которых ожидает boolean.

Reflect не подавляет все ошибки: некорректная цель, недопустимый дескриптор или выброшенное внутри ловушки исключение по-прежнему могут привести к ошибке.

### Пример и его разбор

```javascript
const object = {}
Reflect.defineProperty(object, "id", { value: 7 }) // true
object.id // 7
const locked = Object.preventExtensions({})
Reflect.defineProperty(locked, "newKey", { value: 1 }) // false
// Object.defineProperty(locked, "newKey", { value: 1 }) вызовет TypeError.
```

Первое определение свойства успешно, поэтому `Reflect.defineProperty` возвращает true. У нерасширяемого locked добавить новое поле нельзя: здесь обычный отказ выражается через false. Это удобно, когда нужно явно обработать результат операции, однако ошибки в аргументах и исключения пользовательского кода всё ещё требуют обычной обработки.

### Источники

[MDN: Guide / Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)
