**Redux - модель и ядро store; Redux Toolkit - официальный рекомендуемый способ писать Redux-логику; React-Redux - интеграция с React.** Это не три взаимоисключающие библиотеки.

<!-- wishu:answer-block -->

#### Как это работает

- Toolkit предоставляет `configureStore`, `createSlice`, асинхронные инструменты и RTK Query. Он уменьшает объём ручной настройки и использует практики Redux.
- React-Redux даёт `Provider`, `useSelector` и `useDispatch`. Toolkit сам не превращает произвольное чтение store в подписку компонента.
- Старый switch-`reducer` полезно понимать для модели, но новый материал не стоит строить только на legacy `createStore` и ручных строковых константах.

#### Пример

```javascript
import { configureStore, createSlice } from "@reduxjs/toolkit"
import { Provider, useSelector, useDispatch } from "react-redux"
```

#### Разбор примера

Здесь видны две границы ответственности: Redux Toolkit помогает создать и настроить хранилище, а React Redux связывает его с деревом компонентов. Наличие `configureStore` ещё не подписывает компонент на данные. Для этого store передают через Provider, а компонент читает нужный фрагмент через useSelector. Toolkit является рекомендуемым способом писать Redux, а не отдельным конкурентным хранилищем.

#### Типичная ошибка

> Считать Toolkit отдельным конкурентом Redux или путать его с React-Redux.

#### Для закрепления

- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

#### Источники

[Redux: why rtk is redux today](https://redux.js.org/introduction/why-rtk-is-redux-today)
