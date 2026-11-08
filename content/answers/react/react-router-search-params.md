**Создайте новую копию URLSearchParams, измените нужный ключ и передайте её setter, сохранив остальные параметры.**

<!-- wishu:answer-block -->

### Механизм и границы

- Setter выполняет навигационное обновление URL. Сам объект параметров изменяемый, поэтому не мутируйте его в render.

- Повторяющиеся ключи требуют getAll; пустое значение и отсутствие ключа могут иметь разный смысл.

### Пример

```jsx
setSearchParams((previous) => {
  const next = new URLSearchParams(previous)
  next.set("topic", "react")
  return next
})
```

### Типичная ошибка

Заменить параметры объектом из одного поля и потерять поиск, сортировку и страницу.

### Для закрепления

- [Какие состояния интерфейса стоит хранить в URL и как избежать второго источника истины?](/questions/react-url-state)

- [Что делает BrowserRouter и чем клиентский переход отличается от полной загрузки документа?](/questions/react-router-browser-history)

### Источник

[React Router: useSearchParams](https://reactrouter.com/7.18.5/api/hooks/useSearchParams)
