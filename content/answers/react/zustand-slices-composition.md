**Slices pattern разбивает один state creator на части, объединённые в одном экземпляре store.**

<!-- wishu:answer-block -->

### Механизм и границы

- Каждая часть получает совместимые set/get/api и возвращает свои данные/actions.

- Middleware обычно применяют к объединённому creator, а не независимо внутри каждого slice. Имена полей должны иметь явные границы: spread может незаметно перезаписать конфликт.

### Пример

```jsx
const creator = (...args) => ({
  ...createCartSlice(...args),
  ...createUserSlice(...args),
})
const useAppStore = create(persist(creator, options))
```

### Типичная ошибка

Создать два отдельных stores и назвать их slices одного атомарного состояния.

### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

### Источник

[Zustand: slices-pattern](https://zustand.docs.pmnd.rs/learn/guides/slices-pattern)
