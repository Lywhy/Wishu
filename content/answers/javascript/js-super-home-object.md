**Super в методе связан с home object, где метод был определён. Перенос ссылки на метод в другой объект не переопределяет эту связь, хотя this при вызове может измениться.**

<!-- wishu:answer-block -->

### Механизм и границы

Поэтому вызов super.method нельзя понимать как универсальное this.__proto__.method. Важны и исходное определение метода, и текущий receiver.

Копирование методов через Object.assign не создаёт автоматически новую семантику super. Обычная функция, присвоенная полю без подходящего метода определения, не получает такое же разрешение super.

<!-- wishu:answer-block -->

### Для закрепления

- [Как extends и super связывают классы?](/questions/class-inheritance-super)
- [От чего зависит this внутри функции?](/questions/function-this)

<!-- wishu:answer-block -->

### Источник

[MDN: Operators/super](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super).
