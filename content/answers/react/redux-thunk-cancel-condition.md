**Condition может предотвратить запуск, abort отменяет поддерживаемое ожидание, а `requestId` различает конкретные экземпляры createAsyncThunk.**

<!-- wishu:answer-block -->

#### Как это работает

Используйте `requestId` при политике «последний запрос побеждает» и передавайте signal источнику данных. Отмена клиента не откатывает серверную запись; rejected action может отражать отмену, а не пользовательскую ошибку. Не сводите эти три механизма к одному boolean loading.

#### Пример

```jsx
const promise = dispatch(loadUser(id))
promise.abort()
// В payloadCreator сеть использует thunkAPI.signal.
```

#### Разбор примера

condition может не допустить запуска ненужной операции, а abort относится к уже запущенному thunk. Отмена должна передаваться реальному запросу через signal; она не гарантирует отмену серверной записи. В reducer дополнительно можно сверять `requestId`, чтобы позднее завершение старой попытки не затёрло актуальное состояние. Проверку актуальности применяют и к успеху, и к ошибке.

#### Типичная ошибка

Ожидать от condition отмены уже запущенного запроса или игнорировать идентичность позднего ответа.

#### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

- [Что делает createAsyncThunk и зачем нужен unwrap?](/questions/redux-async-thunk)

#### Источники

[Redux: createAsyncThunk](https://redux.js.org/toolkit/api/createAsyncThunk)
