**`createSlice` объединяет начальное состояние, case `reducers` и генерацию action creators.** Мутационная запись внутри этих `reducers` обрабатывается Immer и превращается в иммутабельное обновление.

<!-- wishu:answer-block -->

#### Механизм и границы

- Draft существует в поддерживаемом контексте Toolkit. Такая запись не разрешает менять объект, полученный через `getState`, в произвольном обработчике.
- В одном case `reducer` либо изменяют draft, либо возвращают замену состояния. Не совмещайте обе стратегии.
- Для примитивного state нельзя изменить сам примитив через draft: верните новое значение. Простое присваивание state = newValue без return не заменяет состояние.

#### Пример

```typescript
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    incremented(state) {
      state.value += 1
    },
  },
})
export const { incremented } = counterSlice.actions
```

#### Для закрепления

- [Почему нельзя изменять объект или массив в state напрямую?](/questions/react-state-immutability)
- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

#### Источник

[Redux: immer reducers](https://redux-toolkit.js.org/usage/immer-reducers).
