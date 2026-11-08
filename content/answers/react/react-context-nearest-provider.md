**Потребитель получает значение ближайшего провайдера того же Context выше в React-дереве.**

<!-- wishu:answer-block -->

### Механизм и границы

- Вложенный провайдер переопределяет значение для своего поддерева.

- Default используется при отсутствии провайдера, а не как запасной вариант любого пустого value.

### Пример

```jsx
<Theme.Provider value="light">
  <Page />
  <Theme.Provider value="dark">
    <Preview />
  </Theme.Provider>
</Theme.Provider>
```

### Типичная ошибка

Ожидать, что внешний провайдер победит внутренний или что поиск зависит от DOM-вложенности портала.

### Для закрепления

- [Как Context передаёт данные и откуда берётся значение по умолчанию?](/questions/react-context)

### Источник

[React: react / useContext](https://react.dev/reference/react/useContext)
