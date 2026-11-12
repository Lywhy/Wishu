**Context доставляет значение и подписывает на его изменение, но не создаёт state, setter или журнал действий автоматически.**

<!-- wishu:answer-block -->

#### Как это работает

Значение может приходить из `useState`, `useReducer` или внешнего store. Объект с методами в value - контракт приложения. Передача одного объекта не добавляет выборочную подписку на его поля.

#### Пример

```jsx
const [theme, setTheme] = useState("light")
return <Theme.Provider value={{ theme, setTheme }}>{children}</Theme.Provider>
```

#### Разбор примера

Theme хранится в `useState`, а Context лишь доставляет пару данных и команды. Setter работает благодаря владельцу, не благодаря созданию провайдера. Новый объект value также следует оценивать по ссылочной идентичности при анализе обновлений потребителей.

#### Типичная ошибка

Ожидать возможности изменить createContext напрямую без владельца состояния.

#### Для закрепления

- [Как Context передаёт данные и откуда берётся значение по умолчанию?](/questions/react-context)

#### Источники

[React: passing-data-deeply-with-context](https://react.dev/learn/passing-data-deeply-with-context)
