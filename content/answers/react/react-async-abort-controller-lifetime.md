**`AbortController` запрашивает отмену поддерживающей signal операции, но не откатывает уже совершённые серверные действия.**

<!-- wishu:answer-block -->

### Механизм и границы

- Создавайте новый controller для нового запуска эффекта и вызывайте abort в cleanup.

- Отличайте отмену от прикладной ошибки; проверяйте, что поздний результат больше не будет применён. Не все произвольные Promise умеют отменяться.

### Пример

```jsx
useEffect(() => {
  const controller = new AbortController()
  void load({ signal: controller.signal }).catch(handleLoadError)
  return () => controller.abort()
}, [load])
```

### Типичная ошибка

Ожидать, что abort вернёт оплату или удалит уже обработанный сервером POST.

### Для закрепления

- [Как предотвратить гонку ответов при загрузке данных в эффекте?](/questions/react-fetch-races)

### Источник

[MDN: AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
