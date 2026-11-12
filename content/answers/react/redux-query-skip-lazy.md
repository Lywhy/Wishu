**Skip/skipToken условно не запускает автоматическую query-подписку, а lazy query позволяет запускать чтение командой.**

<!-- wishu:answer-block -->

#### Как это работает

SkipToken полезен в TypeScript, когда обязательный аргумент пока отсутствует. Не вызывайте сам React-хук условно. Выбор lazy не отменяет кеш и не делает query мутацией; политику использования кеша нужно читать в API trigger.

#### Пример

```jsx
const result = useGetUserQuery(userId ?? skipToken)
const [loadUser] = useLazyGetUserQuery()
```

#### Разбор примера

skipToken позволяет вызвать hook без условного нарушения правил hooks и при этом отложить запрос до появления аргумента. Lazy-hook возвращает trigger для явного старта, например после нажатия. Это разные способы управления подпиской и запуском, а не повод вызывать hook внутри обработчика. При смене аргументов важно также выбрать, какие прежние данные допустимо показывать.

#### Типичная ошибка

Ставить if перед вызовом generated hook вместо управления его аргументом.

#### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

- [Чем RTK Query отличается от запроса внутри createAsyncThunk?](/questions/redux-query-cache)

#### Источники

[Redux: conditional-fetching](https://redux.js.org/toolkit/rtk-query/usage/conditional-fetching)
