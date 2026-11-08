**Если следующее значение известно из события, вычислите его в локальную переменную и используйте и для setter, и для следующего действия.**

<!-- wishu:answer-block -->

### Механизм и границы

- Setter не меняет переменную текущего рендера.

- Если расчёт зависит от конкурентных предыдущих обновлений, используйте чистый updater и отдельно спроектируйте побочный эффект; не отправляйте запрос из updater.

### Пример

```jsx
function change(event) {
  const next = event.target.value
  setQuery(next)
  reportQuery(next)
}
```

### Типичная ошибка

После setQuery(next) передавать в отчёт старый query из замыкания.

### Для закрепления

- [Почему нельзя изменять объект или массив в state напрямую?](/questions/react-state-immutability)

- [Почему значение state не меняется сразу после setState?](/questions/react-state-snapshot)

### Источник

[React: react / useState](https://react.dev/reference/react/useState)
