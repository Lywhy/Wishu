**Set нужно скопировать перед изменением и передать React новый экземпляр.**

<!-- wishu:answer-block -->

### Механизм и границы

- Add и delete меняют существующий Set. Та же ссылка после мутации может не вызвать ожидаемое обновление.

- Для проверки выбора используйте has(id); очищайте устаревшие ID по бизнес-правилам при удалении записей.

### Пример

```jsx
setSelected((previous) => {
  const next = new Set(previous)
  next.has(id) ? next.delete(id) : next.add(id)
  return next
})
```

### Типичная ошибка

Вызвать selected.add(id), затем setSelected(selected).

### Для закрепления

- [Почему нельзя изменять объект или массив в state напрямую?](/questions/react-state-immutability)

### Источник

[React: react / useState](https://react.dev/reference/react/useState)
