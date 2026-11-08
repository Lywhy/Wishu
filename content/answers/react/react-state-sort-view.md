**sort меняет массив на месте, поэтому сортировать props или прежний state напрямую нельзя.**

<!-- wishu:answer-block -->

### Механизм и границы

- Используйте toSorted либо сначала копию массива.

- Если порядок является производным представлением, вычисляйте его из исходных данных и выбора пользователя, а не храните второй несинхронный массив.

### Пример

```jsx
const sorted = [...rows].sort((a, b) => a.price - b.price)
return sorted.map((row) => <Row key={row.id} row={row} />)
```

### Типичная ошибка

В дочернем render вызвать rows.sort и неожиданно изменить данные родителя.

### Для закрепления

- [Почему нельзя изменять объект или массив в state напрямую?](/questions/react-state-immutability)

### Источник

[React: updating-arrays-in-state](https://react.dev/learn/updating-arrays-in-state)
