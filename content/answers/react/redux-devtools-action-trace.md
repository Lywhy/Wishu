**DevTools показывает последовательность событий и изменения снимков state, помогая найти, какое действие привело к неправильному результату.**

<!-- wishu:answer-block -->

### Механизм и границы

- Читайте сначала action type/payload, затем затронутые ветки и порядок событий.

- История не делает побочные действия обратимыми. Не отправляйте в диагностику секреты и персональные данные без политики ограничения.

### Пример

```jsx
dispatch(profileSlice.actions.nameChanged("Анна"))
// В DevTools проверяют payload и изменение profile.name.
```

### Типичная ошибка

При time travel ожидать отмены реально выполненной сетевой операции.

### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

### Источник

[Redux: configureStore](https://redux.js.org/toolkit/api/configureStore)
