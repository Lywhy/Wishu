**`createSlice` объединяет начальное состояние, case `reducers` и генерацию action creators.** Мутационная запись внутри этих `reducers` обрабатывается Immer и превращается в иммутабельное обновление.

<!-- wishu:answer-block -->

#### Как это работает

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

#### Разбор примера

Запись state.value += 1 выглядит как мутация, однако reducer, созданный `createSlice`, работает с Immer-draft. Immer строит следующий неизменяемый снимок и сохраняет ссылки неизменённых ветвей. Это разрешение относится к draft внутри reducer: объект, полученный из store.getState(), так изменять нельзя. Slice также создаёт action creators, но сам не подключается к store без конфигурации reducer.

#### Типичная ошибка

> Распространять разрешение draft-мутаций на все объекты приложения.

#### Для закрепления

- [Почему нельзя изменять объект или массив в state напрямую?](/questions/react-state-immutability)
- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

#### Источники

[Redux: immer reducers](https://redux.js.org/toolkit/usage/immer-reducers)
