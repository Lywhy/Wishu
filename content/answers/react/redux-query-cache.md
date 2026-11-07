**RTK Query управляет server state: запросами, кешем и подписками.** CreateAsyncThunk организует асинхронный переход, но не даёт весь этот кеш-контракт автоматически.

<!-- wishu:answer-block -->

#### Механизм и границы

- Кеш запросов связан с endpoint и сериализованными аргументами. Подписчики одного ключа могут переиспользовать запись.
- Query обычно читает данные, mutation изменяет их. Tags связывают данные с инвалидированием после мутаций.
- Инвалидирование активной записи может вызвать refetch; неактивная запись обрабатывается по правилам кеша. Tags не являются полноценной глобальной нормализацией всех сущностей.
- Объявленный API `reducer` и `middleware` нужно подключить к store. Локальное раскрытие диалога не обязано жить в server-state кеше.

#### Пример

```typescript
const { data, isLoading, isFetching, error } = useGetUserQuery(userId)
// isLoading и isFetching выражают разные состояния первого и последующих запросов.
```

#### Для закрепления

- [Как выбрать между props, Context и внешним store?](/questions/react-state-location)
- [Что делает createAsyncThunk и зачем нужен unwrap?](/questions/redux-async-thunk)

#### Источник

[Redux: automated refetching](https://redux-toolkit.js.org/rtk-query/usage/automated-refetching).
