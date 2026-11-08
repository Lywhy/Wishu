**Action - описание события, а action creator - функция, создающая это описание; данные обычно передают в payload.**

<!-- wishu:answer-block -->

### Механизм и границы

- Вызов action creator сам по себе не меняет store: результат нужно dispatch.

- Toolkit генерирует creators из reducers slice. Тип action должен описывать событие, а не делать сам запрос или изменять DOM.

### Пример

```jsx
const action = counterSlice.actions.added(3)
// { type: 'counter/added', payload: 3 }
store.dispatch(action)
```

### Типичная ошибка

Вызвать added(3) без dispatch и ожидать изменения счётчика.

### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

### Источник

[Redux: part-2-app-structure](https://redux.js.org/tutorials/essentials/part-2-app-structure)
