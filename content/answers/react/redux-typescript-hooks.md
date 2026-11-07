**`RootState` выводят из store.getState, `AppDispatch` - из store.dispatch.** Типизированные hooks дают приложению единый контракт и корректный `dispatch` thunk.

<!-- wishu:answer-block -->

#### Механизм и границы

- В современных версиях React-Redux доступны `useDispatch`.withTypes и `useSelector`.withTypes. Для старых версий встречаются другие поддерживаемые паттерны.
- Не объявляйте отдельный `RootState` вручную, если он может расходиться с подключёнными `reducers`.
- Типы не проверяют JSON во время выполнения. Сетевой ответ нужно проверять на границе независимо от утверждённого TypeScript-типа.

#### Пример

```typescript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
```

#### Для закрепления

- [Как configureStore и Provider подключают Redux к React?](/questions/redux-store-provider)

#### Источник

[Redux: usage with typescript](https://react-redux.js.org/using-react-redux/usage-with-typescript).
