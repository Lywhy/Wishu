**GetState читает текущий снимок, а `getInitialState` возвращает первоначальный снимок, сохранённый при создании store.**

<!-- wishu:answer-block -->

### Механизм и границы

- Это полезно для осмысленного reset и согласованных тестов.

- Не мутируйте initial-объект: иначе исходный снимок перестанет быть надёжной базой. Persisted-восстановление и текущее runtime-состояние имеют отдельный жизненный цикл.

### Пример

```jsx
store.setState(store.getInitialState(), true)
// Сброс допустим, если initial snapshot содержит нужные actions.
```

### Типичная ошибка

Сохранить `getState` после пользовательских изменений и затем называть этот объект исходным состоянием.

### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

### Источник

[Zustand: create-store](https://zustand.docs.pmnd.rs/reference/apis/create-store)
