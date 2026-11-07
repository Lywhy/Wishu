**Нативные browser-модули разрешают спецификаторы по правилам URL и настроенной карты импортов. Имя npm-пакета само по себе не означает, что браузер умеет найти node_modules.**

<!-- wishu:answer-block -->

### Механизм и границы

Import map связывает спецификатор с URL в поддерживаемой среде. Сборщик может решить ту же внешнюю потребность другим способом, преобразовав граф заранее.

Учитывайте базовый URL, расширения, CORS и MIME модуля. TypeScript paths или dev-server proxy не являются универсальной настройкой нативного браузерного загрузчика.

<!-- wishu:answer-block -->

### Источник

[MDN: Statements/import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).
