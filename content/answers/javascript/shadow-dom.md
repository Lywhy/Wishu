**Shadow DOM подключает отдельное дерево к host-элементу через attachShadow.**

<!-- wishu:answer-block -->

### Как это работает

Обычные селекторы документа не проходят внутрь него; стили изолируются с предусмотренными исключениями, например наследуемыми свойствами и CSS custom properties. Slot позволяет отображать переданные снаружи узлы в составе компонента.

Это не граница безопасности. Mode: closed ограничивает обычное получение shadowRoot снаружи, но не делает данные защищёнными от кода страницы.

События пересекают границу согласно composed, а target может переназначаться на host; composedPath помогает изучить доступный путь. Shadow DOM не равен virtual DOM.

### Пример и его разбор

```javascript
const host = document.createElement("div")
const root = host.attachShadow({ mode: "open" })
const label = document.createElement("span")
label.textContent = "Внутри компонента"
root.append(label)
host.shadowRoot === root // true
```

В примере span помещается в отдельное дерево host. При mode open ссылка доступна через shadowRoot, но обычный запрос документа не начинает автоматически искать внутри. Изоляция структуры помогает компонентам, однако не делает отображаемые данные секретными для кода страницы.

### Источники

[MDN: API / Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
