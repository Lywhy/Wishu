**Default-export и named-export имеют разный синтаксис импорта; несовпадение может дать недопустимый тип элемента.**

<!-- wishu:answer-block -->

### Механизм и границы

- Проверьте, что импортирован именно компонент, а не namespace модуля, undefined или Promise.

- Props анализируют после проверки типа. Круговая зависимость также может мешать инициализации импорта.

### Пример

```jsx
// Card.jsx: export default function Card() { ... }
import Card from "./Card.jsx"
// named: export function Panel() { ... }
import { Panel } from "./Panel.jsx"
```

### Типичная ошибка

Добавлять props или менять key, когда фактически импортировано не то значение.

### Для закрепления

- [Что такое JSX и чем он отличается от HTML?](/questions/react-jsx)

### Источник

[React: importing-and-exporting-components](https://react.dev/learn/importing-and-exporting-components)
