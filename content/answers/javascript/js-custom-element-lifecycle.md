**Custom element связывает HTML-имя с классом и получает lifecycle-callback. ConnectedCallback может вызываться повторно при подключениях, поэтому подписки должны иметь симметричную очистку.**

<!-- wishu:answer-block -->

### Механизм и границы

Для реакции на атрибуты используют observedAttributes и attributeChangedCallback; обычное присваивание произвольного JS-свойства не обязано автоматически отражаться в атрибут. Constructor не место для произвольного чтения ещё не готовых потомков.

Разделите публичный API компонента, внутренний DOM и время жизни ресурсов. Shadow DOM является отдельной возможностью и не обязателен для каждого custom element.

<!-- wishu:answer-block -->

### Источник

[MDN: Web_components/Using_custom_elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements).
