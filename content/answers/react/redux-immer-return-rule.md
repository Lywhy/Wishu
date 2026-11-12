**В одном draft-case выбирают либо мутационную запись, либо возврат замены; смешивание стратегий нарушает контракт Immer.**

<!-- wishu:answer-block -->

#### Как это работает

Особенно опасна короткая стрелка с push: она меняет draft и возвращает длину массива. Для полной замены нужен return nextState. Простое присваивание параметру state не заменяет состояние.

#### Пример

```jsx
const configuration = {
  added(state, action) {
    state.items.push(action.payload)
  },
  // Не: (state, action) => state.items.push(action.payload)
}
```

#### Разбор примера

Фигурные скобки в стрелочной функции важны: push возвращает длину массива, но reducer с draft должен либо изменить draft, либо вернуть новый state. Неявный возврат числа вместе с изменением draft смешивает эти два режима. В показанном варианте функция ничего не возвращает, поэтому Immer использует изменения массива. Для полной замены можно вернуть новый объект без мутации draft.

#### Типичная ошибка

Неявно вернуть результат мутирующего метода как новое состояние.

#### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

- [Что создаёт createSlice и почему в его reducer разрешена запись state.value++?](/questions/redux-slice-immer)

#### Источники

[Redux: immer-reducers](https://redux.js.org/toolkit/usage/immer-reducers)
