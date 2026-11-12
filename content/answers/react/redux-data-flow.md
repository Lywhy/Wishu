**Store хранит состояние, `dispatch` отправляет action, `reducer` вычисляет следующее состояние.** Подписчики узнают об обновлении и читают нужный результат.

<!-- wishu:answer-block -->

#### Как это работает

- Action описывает событие и обычно является объектом с `type` и `payload`. Вызов action creator только создаёт action; без `dispatch` изменение не произойдёт.
- Reducer должен быть чистым: без запросов, таймеров и изменения прежнего состояния. Асинхронную работу размещают вне `reducer`.
- Redux не зависит от React. React-Redux связывает store с компонентами и их подписками. Не любое локальное поле нужно переносить в общий store.

#### Пример

```javascript
const action = { type: "counter/incremented", payload: 1 }
store.dispatch(action)
const count = store.getState().counter.value
```

#### Разбор примера

Вызов dispatch передаёт событие в store. Reducer получает прежнее состояние и action, вычисляет следующий снимок, после чего подписчики могут прочитать результат. В примере payload равен 1, поэтому значение увеличивается на единицу. Компонент не изменяет counter напрямую: одинаковая последовательность событий должна давать одинаковое состояние при одинаковой исходной базе.

#### Типичная ошибка

> Изменить store.getState().counter.value напрямую и ждать корректного уведомления.

#### Для закрепления

- [Как выбрать между props, Context и внешним store?](/questions/react-state-location)
- [Когда useReducer удобнее useState?](/questions/react-use-reducer)

#### Источники

[Redux: part 2 concepts data flow](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow)
