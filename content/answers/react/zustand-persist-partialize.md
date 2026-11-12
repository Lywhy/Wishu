**`partialize` выбирает данные для сохранения, не ограничивая само runtime-состояние store.**

<!-- wishu:answer-block -->

#### Как это работает

Обычно сохраняют настройки и нужный черновик, а не loading, ошибки и функции. Данные storage недоверенные; ограничение полей не является шифрованием и не делает токен безопасным. Новая схема требует совместимости или миграции.

#### Пример

```jsx
persist(creator, {
  name: "preferences",
  partialize: (state) => ({ theme: state.theme, density: state.density }),
})
```

#### Разбор примера

В памяти creator по-прежнему может содержать loading и actions, но в storage отправляются только theme и density. При восстановлении эти данные объединяются с текущим состоянием по настройкам persist. `partialize` не является фильтром React-подписки и не гарантирует отсутствие записи в storage при любом несвязанном обновлении. Его задача - отделить долговременную схему от временных деталей работы интерфейса.

#### Типичная ошибка

Считать, что `partialize` удалил поле из текущего store, или сохранять все временные состояния без нужды.

#### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

- [Что сохраняет persist и почему гидратация не всегда завершается сразу?](/questions/zustand-persist-hydration)

#### Источники

[Zustand: persist](https://zustand.docs.pmnd.rs/reference/middlewares/persist)
