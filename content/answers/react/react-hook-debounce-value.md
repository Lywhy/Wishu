**Debounce переносит применение значения до паузы после последнего изменения и отменяет предыдущий таймер.**

<!-- wishu:answer-block -->

### Механизм и границы

- Значение поля обновляют сразу; отложенным становится отдельный результат.

- Это временная политика, а не useDeferredValue и не отмена уже отправленного запроса. При fetch дополнительно защищаются от гонки ответов.

### Пример

```jsx
useEffect(() => {
  const timer = setTimeout(() => setDebounced(query), 300)
  return () => clearTimeout(timer)
}, [query])
```

### Типичная ошибка

Задерживать сам value управляемого input или считать clearTimeout откатом уже начатой сети.

### Для закрепления

- [Для чего нужен useEffect и его cleanup?](/questions/effects)

- [Чем useTransition отличается от useDeferredValue?](/questions/react-transition-deferred)

### Источник

[React: useDeferredValue](https://react.dev/reference/react/useDeferredValue)
