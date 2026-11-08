**Локальное undo можно описать как past, present и future, обновляемые одним reducer по смысловым действиям.**

<!-- wishu:answer-block -->

### Механизм и границы

- Новая правка добавляет прежний present в past и очищает future. Undo переносит present в future; redo делает обратный переход.

- Группируйте серию символов или drag в осмысленные шаги и ограничивайте память. История локального UI не откатывает серверную мутацию автоматически.

### Пример

```jsx
const previous = state.past.at(-1)
// При undo: present = previous,
// past = past.slice(0, -1), future = [oldPresent, ...future].
```

### Типичная ошибка

Сохранять ссылку на мутируемый объект в историю и получить одинаковое содержимое всех снимков.

### Для закрепления

- [Почему нельзя изменять объект или массив в state напрямую?](/questions/react-state-immutability)

- [Когда useReducer удобнее useState?](/questions/react-use-reducer)

### Источник

[React: extracting-state-logic-into-a-reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer)
