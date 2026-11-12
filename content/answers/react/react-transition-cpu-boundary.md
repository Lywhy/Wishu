**StartTransition не создаёт Worker и не переносит синхронную JavaScript-функцию на другой поток.**

<!-- wishu:answer-block -->

#### Как это работает

Callback `startTransition` вызывается сразу. Отложенным становится приоритет поддерживаемых обновлений React, поэтому огромный синхронный цикл до setter всё ещё блокирует поток. Для тяжёлой независимой CPU-работы рассматривают Worker, разбиение задачи или изменение алгоритма.

Transition помогает отзывчивости прерываемого React-рендера, но не является универсальным планировщиком любого JS-кода.

#### Пример

```jsx
startTransition(() => {
  const result = expensiveSynchronousCalculation(data)
  setRows(result)
})
// Сам вызов expensiveSynchronousCalculation не становится фоновым потоком.
```

#### Разбор примера

ExpensiveSynchronousCalculation выполняется прямо в вызванном callback и занимает тот же поток. Несрочным становится поддерживаемое обновление rows. Если тормозит сам расчёт, нужно изменить его объём, алгоритм или место выполнения, а не только обернуть setter.

#### Типичная ошибка

Обернуть парсинг огромного файла в transition и ожидать, что браузер останется отзывчивым.

#### Для закрепления

- [Как предотвратить гонку ответов при загрузке данных в эффекте?](/questions/react-fetch-races)

- [Чем useTransition отличается от useDeferredValue?](/questions/react-transition-deferred)

#### Источники

[React: react / useTransition](https://react.dev/reference/react/useTransition)
