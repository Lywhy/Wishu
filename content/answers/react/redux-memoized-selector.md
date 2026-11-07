**`createSelector` кеширует результат вычисления по входам.** Если нужные части состояния не изменились, он может вернуть прежнюю ссылку на вычисленную коллекцию.

<!-- wishu:answer-block -->

#### Механизм и границы

- Input `selectors` должны извлекать данные, а не создавать новый отфильтрованный массив при каждом вызове. Вычисление размещают в result function.
- Экземпляр `selector` должен иметь понятный жизненный цикл. Его пересоздание внутри каждого рендера теряет полезность кеша.
- Мемоизация не исправляет мутацию исходного массива без смены ссылки. Стратегия кеширования зависит от версии Reselect; не сводите её всегда к одному последнему аргументу.

#### Пример

```typescript
const selectOpen = createSelector([(state: RootState) => state.tasks.items], (items) =>
  items.filter((item) => !item.done),
)
```

#### Для закрепления

- [Почему вычисляемые значения обычно не нужно хранить в state?](/questions/react-derived-state)
- [Когда useSelector обновляет компонент и почему новый объект в selector мешает?](/questions/redux-selector-equality)

#### Источник

[Redux: deriving data selectors](https://redux.js.org/usage/deriving-data-selectors).
