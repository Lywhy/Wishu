**Debounce переносит применение значения до паузы после последнего изменения и отменяет предыдущий таймер.**

<!-- wishu:answer-block -->

#### Как это работает

Значение поля обновляют сразу; отложенным становится отдельный результат. Это временная политика, а не `useDeferredValue` и не отмена уже отправленного запроса. При fetch дополнительно защищаются от гонки ответов.

#### Пример

```jsx
useEffect(() => {
  const timer = setTimeout(() => setDebounced(query), 300)
  return () => clearTimeout(timer)
}, [query])
```

#### Разбор примера

При каждом новом query предыдущий таймер отменяется. Если ввод прекращается на 300 мс, debounced получает соответствующий снимок. Само поле должно обновляться немедленно, а защита от устаревших результатов уже начавшихся запросов остаётся отдельной задачей.

#### Типичная ошибка

Задерживать сам value управляемого input или считать clearTimeout откатом уже начатой сети.

#### Для закрепления

- [Для чего нужен useEffect и его cleanup?](/questions/effects)

- [Чем useTransition отличается от useDeferredValue?](/questions/react-transition-deferred)

#### Источники

[React: useDeferredValue](https://react.dev/reference/react/useDeferredValue)
