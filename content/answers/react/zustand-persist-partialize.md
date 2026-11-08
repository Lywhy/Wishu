**Partialize выбирает данные для сохранения, не ограничивая само runtime-состояние store.**

<!-- wishu:answer-block -->

### Механизм и границы

- Обычно сохраняют настройки и нужный черновик, а не loading, ошибки и функции.

- Данные storage недоверенные; ограничение полей не является шифрованием и не делает токен безопасным. Новая схема требует совместимости или миграции.

### Пример

```jsx
persist(creator, {
  name: "preferences",
  partialize: (state) => ({ theme: state.theme, density: state.density }),
})
```

### Типичная ошибка

Считать, что `partialize` удалил поле из текущего store, или сохранять все временные состояния без нужды.

### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

- [Что сохраняет persist и почему гидратация не всегда завершается сразу?](/questions/zustand-persist-hydration)

### Источник

[Zustand: persist](https://zustand.docs.pmnd.rs/reference/middlewares/persist)
