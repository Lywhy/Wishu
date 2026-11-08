**CombineSlices возвращает reducer с возможностью инъекции новых slices; это помогает подключать feature-state по мере загрузки кода.**

<!-- wishu:answer-block -->

### Механизм и границы

- Подключение reducer и появление конкретного поля в store-snapshot не являются одним событием: state вычисляется при последующих actions, а selectors имеют свой API начального значения.

- Согласуйте типы ленивых slices и правила совпадения reducerPath.

- Динамическая композиция не должна смешивать пользовательские SSR-запросы в общем singleton; срок жизни root store остаётся отдельным контрактом.

### Пример

```jsx
const rootReducer = combineSlices(authSlice)
rootReducer.inject(reportsSlice)
// Store продолжает использовать этот rootReducer; переходы вычисляют новый снимок.
```

### Типичная ошибка

Ожидать, что вызов inject сам эквивалентен dispatch и немедленно переписал state.

### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

### Источник

[Redux: combineSlices](https://redux.js.org/toolkit/api/combineSlices)
