**Custom element связывает HTML-имя с классом и получает lifecycle-callback. `connectedCallback` может вызываться повторно при подключениях, поэтому подписки должны иметь симметричную очистку.**

<!-- wishu:answer-block -->

### Как это работает

Для реакции на атрибуты используют observedAttributes и `attributeChangedCallback`; обычное присваивание произвольного JS-свойства не обязано автоматически отражаться в атрибут. Constructor не место для произвольного чтения ещё не готовых потомков.

Разделите публичный API компонента, внутренний DOM и время жизни ресурсов. Shadow DOM является отдельной возможностью и не обязателен для каждого custom element.

### Пример и его разбор

```javascript
class HelloUser extends HTMLElement {
  static observedAttributes = ["label"]
  connectedCallback() {
    this.render()
  }
  attributeChangedCallback() {
    this.render()
  }
  render() {
    this.textContent = this.getAttribute("label") ?? "Привет"
  }
}
// Один раз в нужном registry: customElements.define("hello-user", HelloUser)
```

`connectedCallback` обеспечивает вывод при подключении, а `attributeChangedCallback` обновляет его при изменении label. Если компонент начнёт подписываться на внешние события, потребуется симметричный disconnectedCallback. Повторное подключение не должно создавать дополнительные одинаковые подписки.

### Типичная ошибка

> Считать `connectedCallback` одноразовым конструктором или любое JS-свойство наблюдаемым атрибутом.

### Источники

[MDN: Web_components/Using_custom_elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)
