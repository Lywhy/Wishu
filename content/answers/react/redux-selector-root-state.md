**`useSelector` вызывает selector с root state; путь к slice нужно описать явно или через композицию selectors.**

<!-- wishu:answer-block -->

#### Как это работает

Selector остаётся чистым вычислением и не должен dispatch или мутировать вход. Локальные selectors slice могут иметь другой вход: назовите и типизируйте эту границу, чтобы не перепутать уровни.

#### Пример

```jsx
const selectCount = (state) => state.counter.value
const count = useSelector(selectCount)
```

#### Разбор примера

`useSelector` передаёт функции корневое состояние store, поэтому путь начинается с counter. Selector, рассчитанный на локальный state slice, нельзя подставлять без адаптации, если он ожидает другую форму аргумента. Явный RootState делает это несоответствие заметным. В приложении полезно экспортировать selectors, скрывающие расположение данных от большинства компонентов.

#### Типичная ошибка

Передать selector, ожидающий counter-state, прямо в `useSelector` и читать value не с того уровня.

#### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

- [Когда useSelector обновляет компонент и почему новый объект в selector мешает?](/questions/redux-selector-equality)

#### Источники

[Redux: hooks](https://redux.js.org/react-redux/api/hooks)
