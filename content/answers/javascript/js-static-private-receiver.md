**Static-метод может наследоваться как обычное свойство конструктора, но private static-поле принадлежит конкретному объявившему его классу. This при вызове через наследника может указывать уже на другой конструктор.**

<!-- wishu:answer-block -->

### Механизм и границы

Чтение this.#field из такого вызова может не пройти brand-check. Если намерение - всегда читать поле базового класса, нужно явно выбрать этот класс, а не предполагать универсальный полиморфизм private static.

Отличайте наследование public-членов, доступность private-имени в лексическом коде и фактический бренд receiver.

<!-- wishu:answer-block -->

### Для закрепления

- [Как работают #приватные элементы и доступны ли они подклассу?](/questions/class-private-elements)
- [Где находятся static-поля и как вызывать статический метод?](/questions/class-static)

<!-- wishu:answer-block -->

### Источник

[MDN: Classes/Private_elements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements).
