**Третий аргумент `useReducer` вычисляет начальное состояние из initialArg при инициализации, а не при каждом обычном обновлении.**

<!-- wishu:answer-block -->

### Механизм и границы

- Init должен быть чистым; `StrictMode` может повторить его для проверки.

- Изменение initialArg после mount не запускает автоматический сброс. Для новой сессии редактора нужен явный action либо осмысленная смена key.

### Пример

```jsx
function init(rows) {
  return { rows, selectedId: null }
}
const [state, dispatch] = useReducer(reducer, initialRows, init)
```

### Типичная ошибка

Повторять дорогое построение аргумента в каждом render и рассчитывать, что наличие reducer отменяет этот вызов.

### Для закрепления

- [Почему нельзя изменять объект или массив в state напрямую?](/questions/react-state-immutability)

- [Когда useReducer удобнее useState?](/questions/react-use-reducer)

### Источник

[React: useReducer](https://react.dev/reference/react/useReducer)
