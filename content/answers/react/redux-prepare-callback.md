**Prepare задаёт, как аргументы action creator превращаются в payload и при необходимости meta/error.**

<!-- wishu:answer-block -->

### Механизм и границы

- Reducer получает уже подготовленный action и остаётся чистым.

- ID и время можно создавать при подготовке события, а не в reducer, где повторное воспроизведение должно дать тот же результат.

### Пример

```jsx
const configuration = {
  added: {
    prepare(title) {
      return { payload: { id: crypto.randomUUID(), title } }
    },
    reducer(state, action) {
      state.items.push(action.payload)
    },
  },
}
```

### Типичная ошибка

Генерировать случайный ID внутри reducer, делая воспроизведение события недетерминированным.

### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

### Источник

[Redux: createSlice](https://redux.js.org/toolkit/api/createSlice)
