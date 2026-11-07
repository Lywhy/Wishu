**New.target показывает конструктор, через который началось соответствующее создание, либо undefined при обычном вызове подходящей функции. Reflect.construct вызывает конструктор с отдельным newTarget по заданному контракту.**

<!-- wishu:answer-block -->

### Механизм и границы

Это помогает понять наследование и фабрики, но не позволяет превратить любую стрелку в конструктор: target и newTarget должны поддерживать конструирование. New.target в стрелке берётся лексически из подходящего внешнего контекста.

Object.create создаёт объект с прототипом, но не выполняет инициализацию конструктора и не устанавливает его private slots.

<!-- wishu:answer-block -->

### Источник

[MDN: Operators/new.target](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target).
