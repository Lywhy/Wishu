**Setup-функция `useEffect` должна вернуть cleanup либо ничего, а async-функция всегда возвращает Promise.** Поэтому асинхронную работу запускают внутри обычного callback эффекта.

<!-- wishu:answer-block -->

### Как это работает

- Объявите внутреннюю async-функцию, вызовите её и обработайте отказ Promise.

- Если результат может прийти после смены зависимости, исключите применение устаревшего ответа. При поддержке API можно дополнительно отменять запрос.

- Cleanup тоже не должен возвращать Promise: React не ждёт произвольного асинхронного завершения очистки. Подробности отмены и гонок относятся к отдельному каноническому вопросу.

### Пример

```jsx
useEffect(() => {
  let active = true
  async function load() {
    try {
      const data = await loadUser(userId)
      if (active) setUser(data)
    } catch (error) {
      if (active) setError(error)
    }
  }
  void load()
  return () => {
    active = false
  }
}, [userId])
```

### Типичная ошибка

Написать `useEffect`(async () => ...): Promise не является функцией очистки.

### Источники

- [React: react / useEffect](https://react.dev/reference/react/useEffect)
