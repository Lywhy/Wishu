**Index route показывает содержимое по URL родителя без дополнительного сегмента и не имеет собственного path.**

<!-- wishu:answer-block -->

#### Как это работает

Он удобен как начальный дочерний экран layout. Index не является префиксом для новых детей. Маршрут с path создаёт отдельное сопоставление сегмента.

#### Пример

```jsx
<Route path="account" element={<AccountLayout />}>
  <Route index element={<Overview />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

#### Разбор примера

Overview отвечает на /account, а Settings на /account/settings. У обоих общий AccountLayout с Outlet. Index не добавляет новый сегмент и не служит контейнером для дальнейшего вложенного маршрута.

#### Типичная ошибка

Добавить path к index или ожидать от него роли общего layout.

#### Для закрепления

- [Какие состояния интерфейса стоит хранить в URL и как избежать второго источника истины?](/questions/react-url-state)

- [Что делает BrowserRouter и чем клиентский переход отличается от полной загрузки документа?](/questions/react-router-browser-history)

#### Источники

[React Router: routing](https://reactrouter.com/7.18.5/start/declarative/routing)
