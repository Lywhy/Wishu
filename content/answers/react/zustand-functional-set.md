**Функциональный set нужен, когда новое значение вычисляется из актуального предыдущего снимка, особенно при переиспользуемом action.**

<!-- wishu:answer-block -->

### Механизм и границы

- Объектный set подходит для уже известного значения.

- Не изменяйте прежний снимок внутри updater без immer middleware. Совпадение синтаксиса с React-setter не означает одинаковые правила merge.

### Пример

```jsx
const configuration = {
  increment: () => set((state) => ({ count: state.count + 1 })),
}
```

### Типичная ошибка

Захватить count один раз вне action и постоянно прибавлять к устаревшему значению.

### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

### Источник

[Zustand: create](https://zustand.docs.pmnd.rs/reference/apis/create)
