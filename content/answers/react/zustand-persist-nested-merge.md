**Поверхностное объединение persisted-state может заменить вложенный объект целиком и потерять поля, добавленные в новой версии приложения.**

<!-- wishu:answer-block -->

### Механизм и границы

- Выберите явный merge или миграцию по схеме.

- Глубокий универсальный merge тоже не знает смысл массивов, удалений и несовместимых типов. Проверяйте восстановленные данные до использования и сохраняйте актуальные actions.

### Пример

```jsx
const configuration = {
  merge: (persisted, current) => ({
    ...current,
    ...persisted,
    settings: { ...current.settings, ...persisted.settings },
  }),
  // persisted предварительно проверен и имеет ожидаемую схему.
}
```

### Типичная ошибка

Применить spread верхнего уровня и ожидать сохранения всех новых вложенных настроек.

### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

- [Как version и migrate помогают изменить формат сохранённого Zustand-state?](/questions/zustand-persist-migration)

- [Что сохраняет persist и почему гидратация не всегда завершается сразу?](/questions/zustand-persist-hydration)

### Источник

[Zustand: persist](https://zustand.docs.pmnd.rs/reference/middlewares/persist)
