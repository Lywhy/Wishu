**Вывод: **TypeError**, затем **3 1**. Обычная запись и DefineOwnProperty имеют разные пути проверки.**

<!-- wishu:answer-block -->

### Механизм и границы

Невritable унаследованное data-свойство запрещает соответствующее обычное присваивание. Но новый расширяемый child допускает явное создание собственного свойства с тем же именем. Это не меняет descriptor прототипа.

Readonly в TypeScript к этому runtime-механизму не относится.

<!-- wishu:answer-block -->

### Для закрепления

- [Что происходит при присваивании свойству, найденному в прототипе?](/questions/js-inherited-assignment)
- [Что такое дескриптор свойства и как defineProperty задаёт его флаги?](/questions/property-descriptors)

<!-- wishu:answer-block -->

### Источник

[ECMAScript: актуальный living draft](https://tc39.es/ecma262/).
