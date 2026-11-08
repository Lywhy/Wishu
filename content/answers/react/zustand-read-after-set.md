**После обычного синхронного set вызов get читает обновлённый снимок Zustand-store.**

<!-- wishu:answer-block -->

### Механизм и границы

- Переменная selector из уже выполняющегося React-render при этом остаётся прежним снимком до нового render.

- Асинхронное действие ещё должно дождаться своей внешней операции; синхронность set не завершает весь async-workflow.

### Пример

```jsx
const configuration = {
  increment: () => {
    set((state) => ({ count: state.count + 1 }))
    console.log(get().count)
  },
}
```

### Типичная ошибка

После action читать старый count из замыкания React и делать вывод, что store не обновился.

### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

### Источник

[Zustand: create-store](https://zustand.docs.pmnd.rs/reference/apis/create-store)
