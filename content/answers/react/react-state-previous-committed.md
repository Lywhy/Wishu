**Предыдущее зафиксированное значение можно сохранить в ref после commit, если оно нужно для сравнения, а не как второй владелец текущего UI.**

<!-- wishu:answer-block -->

### Механизм и границы

- Запись в эффекте обновит ref для следующего рендера без дополнительного setter. Чтение ref в render может конфликтовать с современными правилами чистоты; для отображаемого предыдущего значения выбирайте явную модель state.

- Для решения задачи часто достаточно сохранённой предыдущей версии внутри обработчика или reducer. Не делайте универсальный usePrevious без определения момента снимка.

### Пример

```jsx
useEffect(() => {
  const previous = previousValue.current
  if (previous !== value) reportChange(previous, value)
  previousValue.current = value
}, [value])
```

### Типичная ошибка

Писать previousValue.current = value в render, получая побочный эффект от незавершённой попытки.

### Для закрепления

- [Почему нельзя изменять объект или массив в state напрямую?](/questions/react-state-immutability)

- [Чем useRef отличается от useState?](/questions/react-ref-state)

### Источник

[React: useRef](https://react.dev/reference/react/useRef)
