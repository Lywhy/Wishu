**`AbortController` запрашивает отмену поддерживающей signal операции, но не откатывает уже совершённые серверные действия.**

<!-- wishu:answer-block -->

#### Как это работает

Создавайте новый controller для нового запуска эффекта и вызывайте abort в cleanup. Отличайте отмену от прикладной ошибки; проверяйте, что поздний результат больше не будет применён. Не все произвольные Promise умеют отменяться.

#### Пример

```jsx
useEffect(() => {
  const controller = new AbortController()
  void load({ signal: controller.signal }).catch(handleLoadError)
  return () => controller.abort()
}, [load])
```

#### Разбор примера

Controller создаётся для текущего запуска и отменяется его cleanup. Load обязан реально использовать signal, а handleLoadError различать ожидаемую отмену и сбой. Отмена клиентского ожидания не доказывает, что сервер не успел обработать запрос.

#### Типичная ошибка

Ожидать, что abort вернёт оплату или удалит уже обработанный сервером POST.

#### Для закрепления

- [Как предотвратить гонку ответов при загрузке данных в эффекте?](/questions/react-fetch-races)

#### Источники

[MDN: AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
