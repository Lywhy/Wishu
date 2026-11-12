**Серверный JavaScript не имеет браузерных window, document и localStorage.**

<!-- wishu:answer-block -->

#### Как это работает

Код модуля тоже может выполниться на сервере, ещё до компонента. Проверка typeof window убирает ReferenceError, но разный вывод первого render всё ещё может нарушить гидратацию. Браузерное чтение часто делают после mount с согласованным начальным UI.

#### Пример

```jsx
useEffect(() => {
  try {
    setSavedTheme(localStorage.getItem("theme"))
  } catch {
    setSavedTheme(null) // Storage может быть недоступен.
  }
}, [])
```

#### Разбор примера

Чтение `localStorage` выполняется после клиентского commit, поэтому не обращается к отсутствующему объекту во время SSR. Начальный `savedTheme` должен давать согласованный HTML. Ошибку доступа к storage также обрабатывают, поскольку даже браузер не гарантирует разрешённое чтение.

#### Типичная ошибка

Прочитать `localStorage` в глобальном initialState и считать компонент исключительно клиентским из-за наличия эффекта.

#### Для закрепления

- [Что такое гидратация и почему возникает hydration mismatch?](/questions/react-hydration)

#### Источники

[React: useEffect](https://react.dev/reference/react/useEffect)
