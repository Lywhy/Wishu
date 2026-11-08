**В одном draft-case выбирают либо мутационную запись, либо возврат замены; смешивание стратегий нарушает контракт Immer.**

<!-- wishu:answer-block -->

### Механизм и границы

- Особенно опасна короткая стрелка с push: она меняет draft и возвращает длину массива.

- Для полной замены нужен return nextState. Простое присваивание параметру state не заменяет состояние.

### Пример

```jsx
const configuration = {
  added(state, action) {
    state.items.push(action.payload)
  },
  // Не: (state, action) => state.items.push(action.payload)
}
```

### Типичная ошибка

Неявно вернуть результат мутирующего метода как новое состояние.

### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

- [Что создаёт createSlice и почему в его reducer разрешена запись state.value++?](/questions/redux-slice-immer)

### Источник

[Redux: immer-reducers](https://redux.js.org/toolkit/usage/immer-reducers)
