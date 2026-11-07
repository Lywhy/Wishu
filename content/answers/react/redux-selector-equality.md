**`useSelector` выбирает результат из store и по умолчанию сравнивает его с прежним через строгое равенство ссылок.** Новый объект после каждого `dispatch` может вызвать обновление даже с теми же полями.

<!-- wishu:answer-block -->

#### Механизм и границы

- Выбирайте небольшое значение или используйте несколько `selector`-вызовов. Чтение всего root state подписывает компонент слишком широко.
- Для небольшого объекта можно явно использовать `shallowEqual`; для вычисляемых коллекций полезен мемоизированный `selector`.
- Selector должен быть чистым: его могут вызывать повторно и при проверках разработки. Подписка не запрещает рендеры из-за props, `Context` или родителя.

#### Пример

```tsx
const count = useSelector((state: RootState) => state.counter.value)
const pair = useSelector(
  (state: RootState) => ({ count: state.counter.value, theme: state.settings.theme }),
  shallowEqual,
)
```

#### Для закрепления

- [Для чего предназначен useSyncExternalStore?](/questions/react-external-store)

#### Источник

[Redux: hooks](https://react-redux.js.org/api/hooks#equality-comparisons-and-updates).
