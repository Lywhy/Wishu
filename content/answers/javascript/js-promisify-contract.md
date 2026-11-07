**Адаптер вызывает исходную функцию с callback и переводит согласованный error-first исход в resolve/reject. Нужно сохранить this и понять, поддерживает ли исходный API один результат или множество событий.**

<!-- wishu:answer-block -->

### Механизм и границы

Promise допускает только одно завершение: многократный callback не становится потоком значений. Синхронная ошибка внутри executor превращается в отклонение, но ресурсы, отмена и тайм-аут сами не появляются.

Показанная функция предполагает конкретную конвенцию callback(error, value). Для другого API нужна другая адаптация.

<!-- wishu:answer-block -->

### Источник

[MDN: Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
