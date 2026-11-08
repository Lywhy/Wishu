**Reducer возвращает начальное значение для undefined state, а для неизвестного действия - прежнее состояние.**

<!-- wishu:answer-block -->

### Механизм и границы

- Redux использует служебные действия для инициализации и проверки reducer-контракта.

- Не бросайте исключение на любое неизвестное действие: один action проходит через несколько независимых reducers.

### Пример

```jsx
function counter(state = 0, action) {
  if (action.type === "increment") return state + 1
  return state
}
```

### Типичная ошибка

Вернуть undefined в default-ветке и сломать корневое состояние.

### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

### Источник

[Redux: combinereducers](https://redux.js.org/api/combinereducers)
