**`configureStore` создаёт store с `reducer` и стандартной настройкой; `Provider` передаёт этот экземпляр React-подписчикам.** Ключи `reducer` определяют форму root state.

<!-- wishu:answer-block -->

#### Как это работает

- Если `reducer` задан объектом { counter: counterReducer }, счётчик находится в state.counter. Имя `createSlice` не обязано совпадать с этим ключом.
- Не создавайте новый store при каждом рендере оболочки: так сбрасываются данные и подписки. В клиентском приложении выбирают устойчивого владельца.
- SSR требует изоляции экземпляров по запросам; модульный singleton с пользовательскими данными не является универсальным серверным решением.

#### Пример

```tsx
const store = configureStore({ reducer: { counter: counterReducer } })

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)
```

#### Разбор примера

Ключ counter в `configureStore` задаёт путь состояния: значение reducer будет находиться в state.counter. Provider передаёт экземпляр store потомкам, но не копирует его для каждого компонента. Создание нового store при каждом рендере оболочки сбрасывало бы данные и подписки; экземпляр должен жить столько, сколько соответствующая область приложения.

#### Типичная ошибка

> Читать state.value вместо state.counter.value или пересоздавать store в рендере.

#### Для закрепления

- [Почему пользовательское состояние SSR нельзя бездумно хранить в singleton-store модуля?](/questions/react-ssr-state-isolation)
- [Как устроен поток данных Redux: store, action, dispatch и reducer?](/questions/redux-data-flow)

#### Источники

[Redux: configureStore](https://redux.js.org/toolkit/api/configureStore)
