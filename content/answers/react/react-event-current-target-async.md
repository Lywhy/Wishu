**`currentTarget` относится к элементу, чей обработчик сейчас выполняется; нужный узел или значение лучше сохранить до await.**

<!-- wishu:answer-block -->

#### Как это работает

Сохраните конкретные данные события синхронно, затем запускайте асинхронную работу. Это не отменяет необходимости проверить, что результат ещё актуален. Отмена pooling в современном React DOM не делает `currentTarget` вечным снимком обработчика. После await сам узел тоже может быть удалён.

#### Пример

```jsx
async function submit(event) {
  event.preventDefault()
  const data = new FormData(event.currentTarget)
  await save(data)
}
```

#### Разбор примера

`FormData` снимает вход формы до начала ожидания save. После await обработчику уже не требуется заново читать currentTarget. Это также отделяет отправляемый снимок от последующего ввода, который пользователь может успеть изменить во время запроса.

#### Типичная ошибка

После await заново читать event.`currentTarget` и ожидать прежний контекст обработки.

#### Для закрепления

- [Что такое JSX и чем он отличается от HTML?](/questions/react-jsx)

- [Как распространение React-событий связано с DOM и обработчиками capture?](/questions/react-event-boundaries)

#### Источники

[React: components / common](https://react.dev/reference/react-dom/components/common)
