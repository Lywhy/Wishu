**Prepare задаёт, как аргументы action creator превращаются в payload и при необходимости meta/error.**

<!-- wishu:answer-block -->

#### Как это работает

Reducer получает уже подготовленный action и остаётся чистым. ID и время можно создавать при подготовке события, а не в reducer, где повторное воспроизведение должно дать тот же результат.

#### Пример

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

#### Разбор примера

prepare формирует payload до входа в reducer: здесь он добавляет идентификатор к заголовку. Reducer затем получает уже готовые данные и остаётся воспроизводимым. Генерацию случайного ID или времени не стоит переносить внутрь reducer, иначе повторная обработка одного события могла бы дать иной результат. Возвращаемое значение prepare должно иметь ожидаемую структуру с payload.

#### Типичная ошибка

Генерировать случайный ID внутри reducer, делая воспроизведение события недетерминированным.

#### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

#### Источники

[Redux: createSlice](https://redux.js.org/toolkit/api/createSlice)
