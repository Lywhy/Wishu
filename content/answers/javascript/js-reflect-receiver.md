**Receiver определяет получателя для getter/setter и участвует в семантике записи. Передача только target может незаметно изменить this и поведение наследующего объекта или Proxy.**

<!-- wishu:answer-block -->

### Механизм и границы

Ловушка, возвращающая target[key], не всегда эквивалентна Reflect.get(target, key, receiver). В getter могут читаться другие поля, которые должны разрешаться через реального получателя.

Reflect помогает сохранить обычные правила, но не отменяет инварианты Proxy и ограничения внутренних слотов встроенных объектов.

<!-- wishu:answer-block -->

### Для закрепления

- [Как работают геттеры и сеттеры объекта?](/questions/object-accessors)
- [Чем Reflect отличается от Object и что возвращает Reflect.defineProperty?](/questions/reflect-object-operations)

<!-- wishu:answer-block -->

### Источник

[MDN: Global_Objects/Reflect/get](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get).
