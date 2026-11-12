**Reducer возвращает начальное значение для undefined state, а для неизвестного действия - прежнее состояние.**

<!-- wishu:answer-block -->

#### Как это работает

Redux использует служебные действия для инициализации и проверки reducer-контракта. Не бросайте исключение на любое неизвестное действие: один action проходит через несколько независимых reducers.

#### Пример

```jsx
function counter(state = 0, action) {
  if (action.type === "increment") return state + 1
  return state
}
```

#### Разбор примера

Значение по умолчанию применяется, когда reducer получает undefined, например при инициализации. Для незнакомого action возвращается прежний state: каждый reducer видит общий поток и не обязан обрабатывать каждое событие. Возврат undefined в обычной ветке нарушил бы контракт Redux. Поэтому default здесь сохраняет состояние, а не выбрасывает исключение на любой чужой type.

#### Типичная ошибка

Вернуть undefined в default-ветке и сломать корневое состояние.

#### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

#### Источники

[Redux: combinereducers](https://redux.js.org/api/combinereducers)
