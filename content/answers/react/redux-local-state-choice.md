**В Redux стоит переносить данные с общим владельцем, временем жизни или межэкранными инвариантами, а не каждую локальную деталь UI.**

<!-- wishu:answer-block -->

### Механизм и границы

- Открытость tooltip и временный ввод одного независимого поля часто проще хранить рядом.

- Долгоживущий черновик, общий фильтр или воспроизводимый workflow могут оправдать store. Наличие Redux в проекте не отменяет `useState`.

### Пример

```jsx
const [isHelpOpen, setHelpOpen] = useState(false)
const account = useSelector(selectAccount)
```

### Типичная ошибка

Проводить каждое движение мыши через глобальный store без потребности других потребителей.

### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

### Источник

[Redux: organizing-state](https://redux.js.org/faq/organizing-state)
