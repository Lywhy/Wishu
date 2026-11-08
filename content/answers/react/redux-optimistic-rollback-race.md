**Обратный patch старой оптимистичной мутации может перетереть более новое изменение той же кеш-записи.**

<!-- wishu:answer-block -->

### Механизм и границы

- Для простого одиночного сценария undo удобен, но перекрытие требует политики порядка или восстановления канонического ответа.

- При гонке иногда безопаснее инвалидировать связанные теги и заново запросить данные, чем применить старый inverse patch.

- UpdateQueryData меняет существующую запись endpoint+args, а не весь глобальный кеш сущности. Серверная версия остаётся отдельной частью согласованности.

### Пример

```jsx
const patch = dispatch(
  api.util.updateQueryData("getPost", id, (draft) => {
    draft.title = nextTitle
  }),
)
// При конфликтующих запросах рассматривают invalidation/refetch вместо слепого patch.undo().
```

### Типичная ошибка

Считать каждый undo независимым от остальных изменений того же объекта.

### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

- [Как обрабатывать несколько перекрывающихся оптимистичных изменений одной записи?](/questions/react-optimistic-overlap-rebase)

### Источник

[Redux: manual-cache-updates](https://redux.js.org/toolkit/rtk-query/usage/manual-cache-updates)
