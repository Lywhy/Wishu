**Вывод: **base B**. Первая ловушка читает accessor непосредственно на target, вторая сохраняет receiver b.**

<!-- wishu:answer-block -->

### Механизм и границы

У a есть собственное name, но wrong-ловушка теряет его как получателя getter. Reflect.get получает и использует исходный receiver, поэтому this.name у b находит B.

Корректное перенаправление операций не сводится к чтению одноимённого поля target.

<!-- wishu:answer-block -->

### Для закрепления

- [Зачем Reflect.get и Reflect.set нужен receiver?](/questions/js-reflect-receiver)
- [Как Proxy перехватывает операции и что такое ловушки?](/questions/proxy-traps)

<!-- wishu:answer-block -->

### Источник

[ECMAScript: актуальный living draft](https://tc39.es/ecma262/).
