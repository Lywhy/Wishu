**Серверный JavaScript не имеет браузерных window, document и localStorage.**

<!-- wishu:answer-block -->

### Механизм и границы

- Код модуля тоже может выполниться на сервере, ещё до компонента.

- Проверка typeof window убирает ReferenceError, но разный вывод первого render всё ещё может нарушить гидратацию. Браузерное чтение часто делают после mount с согласованным начальным UI.

### Пример

```jsx
useEffect(() => {
  setSavedTheme(localStorage.getItem("theme"))
}, [])
```

### Типичная ошибка

Прочитать localStorage в глобальном initialState и считать компонент исключительно клиентским из-за наличия эффекта.

### Для закрепления

- [Что такое гидратация и почему возникает hydration mismatch?](/questions/react-hydration)

### Источник

[React: useEffect](https://react.dev/reference/react/useEffect)
