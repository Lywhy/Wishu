**`RootState` выводят из store.getState, `AppDispatch` - из store.dispatch.** Типизированные hooks дают приложению единый контракт и корректный `dispatch` thunk.

<!-- wishu:answer-block -->

#### Как это работает

- В современных версиях React-Redux доступны `useDispatch.withTypes` и `useSelector.withTypes`. Для старых версий встречаются другие поддерживаемые паттерны.
- Не объявляйте отдельный `RootState` вручную, если он может расходиться с подключёнными `reducers`.
- Типы не проверяют JSON во время выполнения. Сетевой ответ нужно проверять на границе независимо от утверждённого TypeScript-типа.

#### Пример

```typescript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
```

#### Разбор примера

RootState выводится из реальной формы `getState`, а AppDispatch учитывает настроенные middleware, включая thunk. Типизированные hooks позволяют компонентам использовать этот контракт без повторяющихся приведений. Они не создают второй store и не проверяют JSON во время выполнения: ответ сервера по-прежнему необходимо валидировать на границе приложения.

#### Типичная ошибка

> Использовать обычный Dispatch и терять поддержку типизированных thunks.

#### Для закрепления

- [Как configureStore и Provider подключают Redux к React?](/questions/redux-store-provider)

#### Источники

[Redux: usage with typescript](https://redux.js.org/react-redux/using-react-redux/usage-with-typescript)
