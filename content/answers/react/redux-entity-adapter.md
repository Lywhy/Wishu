**`createEntityAdapter` предоставляет структуру `ids`/`entities`, операции коллекции и `selectors`.** Он реализует типовой механизм нормализации, но не определяет все отношения доменной модели.

<!-- wishu:answer-block -->

#### Как это работает

- У сущности нужен стабильный ID; `selectId` позволяет выбрать другое поле. `sortComparer` задаёт поддерживаемый порядок `ids`.
- Полученные операции удобно использовать в `createSlice`. Обновления полей имеют свой контракт и не означают произвольный глубокий merge любого объекта.
- Выбранный ID храните отдельно от копии сущности. RTK Query не превращает автоматически все ответы разных endpoints в одну глобальную `entities`-таблицу.

#### Пример

```typescript
type Task = { id: string; title: string; done: boolean }
const tasksAdapter = createEntityAdapter<Task>()
const initialState = tasksAdapter.getInitialState({ selectedId: null as string | null })
```

#### Разбор примера

Adapter создаёт согласованную форму ids и entities и предоставляет операции над коллекцией. В примере selectedId остаётся отдельным полем UI, а не вторым хранилищем выбранного объекта. Получать запись можно по идентификатору, не перебирая весь массив. Adapter не загружает данные самостоятельно и не связывает автоматически копии одной сущности в разных query-ответах.

#### Типичная ошибка

> Считать adapter полноценной ORM или ожидать глубокого слияния вложенных полей.

#### Для закрепления

- [Когда сущности в состоянии лучше хранить по ID, а не копировать в разные ветви?](/questions/react-normalized-state)

#### Источники

[Redux: createEntityAdapter](https://redux.js.org/toolkit/api/createEntityAdapter)
