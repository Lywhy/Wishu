**Zustand нужен для осмысленно общего или долгоживущего состояния; изолированный UI одного компонента часто проще оставить в `useState`.**

<!-- wishu:answer-block -->

### Механизм и границы

- Оценивайте владельца, подписчиков и срок жизни данных.

- Общий store может сохранить то, что должно сброситься при закрытии редактора. Context со scoped-store помогает выбрать границу, но не нужен для каждого раскрытия подсказки.

### Пример

```jsx
const [tooltipOpen, setTooltipOpen] = useState(false)
const cartCount = useCart((state) => state.items.length)
```

### Типичная ошибка

Сделать один глобальный open для всех независимых диалогов.

### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

### Источник

[Zustand: comparison](https://zustand.docs.pmnd.rs/learn/getting-started/comparison)
