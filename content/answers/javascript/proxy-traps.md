**`new` Proxy(target, handler) создаёт отдельный объект-посредник над объектом target.**

<!-- wishu:answer-block -->

### Как это работает

Методы handler, называемые ловушками, перехватывают определённые операции: get - чтение, `Set` - запись, has - оператор in, ownKeys - запрос ключей. Если ловушки нет, соответствующая операция передаётся цели по стандартным правилам.

Reflect помогает передать операцию дальше с нужными аргументами. Например, `Reflect.get`(target, key, receiver) сохраняет receiver для `getter`; `Set` должен сообщить boolean об успехе.

Доступ напрямую к target обходит Proxy, вложенные объекты не становятся Proxy автоматически, а proxy !== target. Для некоторых встроенных объектов и приватных полей класса простой прокси не является прозрачной заменой.

Ловушки обязаны соблюдать инварианты цели. Например, get не может выдавать другое значение собственного неконфигурируемого data-свойства, если оно недоступно для записи.

Нарушение приводит к TypeError; Proxy позволяет настраивать операции в рамках правил, а не отменяет дескрипторы.

### Пример и его разбор

```javascript
const target = { name: "Аня" }
const proxy = new Proxy(target, {
  get(object, key, receiver) {
    return Reflect.get(object, key, receiver)
  },
  set(object, key, value, receiver) {
    if (key === "name" && typeof value !== "string") return false
    return Reflect.set(object, key, value, receiver)
  },
})
proxy.name = "Оля"
target.name // "Оля"
```

Запись proxy.name сначала попадает в `Set`-ловушку. После проверки типа `Reflect.set` выполняет стандартную операцию, и новое имя видно через target. Прямое обращение к target этот контроль обходит. Следовательно, правила посредника распространяются на обращения через него, а не автоматически на все ссылки на исходный объект.

### Источники

[MDN: Guide / Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)
