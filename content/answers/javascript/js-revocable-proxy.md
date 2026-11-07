**Proxy.revocable возвращает proxy и revoke. После отзыва последующие операции, использующие отозванный proxy, перестают нормально обращаться к target и обычно вызывают TypeError.**

<!-- wishu:answer-block -->

### Механизм и границы

Отзыв не уничтожает target и не забирает копии данных или прямые ссылки, которые были выданы раньше. Если handler уже передал наружу вложенный target-object, тот не становится автоматически отозванным.

Это инструмент управления конкретным посредником, а не самостоятельная граница безопасности для произвольного недоверенного кода.

<!-- wishu:answer-block -->

### Источник

[MDN: Global_Objects/Proxy/revocable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable).
