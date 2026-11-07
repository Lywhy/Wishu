**Вывод: **[3]**, затем **4**. Assign записывает через существующий setter, а spread/new literal создаёт собственные data-свойства по своим правилам.**

<!-- wishu:answer-block -->

### Механизм и границы

Во время spread accessor target.value читается, но getter у него отсутствует, поэтому на этом шаге значение undefined. Следующее value: 4 задаёт значение нового свойства copy. Setter исходного target при этом повторно не вызывается.

Важно разделять чтение source, запись target и определение нового свойства.

<!-- wishu:answer-block -->

### Для закрепления

- [Что делает Object.assign и чем он отличается от spread?](/questions/object-assign)
- [Как работают геттеры и сеттеры объекта?](/questions/object-accessors)

<!-- wishu:answer-block -->

### Источник

[ECMAScript: актуальный living draft](https://tc39.es/ecma262/).
