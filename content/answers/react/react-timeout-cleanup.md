**Идентификатор отложенного действия сохраняют в setup и отменяют через clearTimeout при очистке эффекта.**

<!-- wishu:answer-block -->

### Механизм и границы

- Это предотвращает выполнение ещё не сработавшего таймера при смене зависимостей или unmount.

- Cleanup не откатывает действие, которое уже произошло; внешний API может иметь собственную отмену.

### Пример

```jsx
useEffect(() => {
  const timer = setTimeout(() => notify(message), 3000)
  return () => clearTimeout(timer)
}, [message])
```

### Типичная ошибка

Оставить старый таймер при смене message и показать несколько устаревших уведомлений.

### Для закрепления

- [Для чего нужен useEffect и его cleanup?](/questions/effects)

### Источник

[React: react / useEffect](https://react.dev/reference/react/useEffect)
