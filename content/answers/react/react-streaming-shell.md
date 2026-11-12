**Shell - часть HTML вокруг ещё не готовых Suspense-областей, которую уже можно начать отправлять.** `onAllReady` означает более позднюю готовность всего рендера, а не начало интерактивности клиента.

<!-- wishu:answer-block -->

#### Как это работает

В Node.js `renderToPipeableStream` предоставляет `onShellReady` для начала потока и `onAllReady` для сценариев, где хотят дождаться полного HTML. После отправки заголовков нельзя свободно заменить HTTP-статус поздней ошибки. Обработку `onShellError` и журналирование onError продумывают до pipe.

Потоковый SSR не равен Server Components и не устраняет необходимость клиентской гидратации интерактивной части. В Web Streams-средах используется другой API.

#### Пример

```jsx
const { pipe } = renderToPipeableStream(<App />, {
  onShellReady() {
    response.setHeader("Content-Type", "text/html")
    pipe(response)
  },
  onShellError(error) {
    response.statusCode = 500
    response.end("Не удалось показать страницу")
  },
})
// response - HTTP-ответ Node.js; обработка abort опущена.
```

#### Разбор примера

OnShellReady начинает отправку доступной оболочки, не ожидая всех Suspense-областей. OnShellError может ответить запасным документом до начала этого потока. После pipe стратегия поздней ошибки уже ограничена отправленными заголовками и доступной клиентской обработкой.

#### Типичная ошибка

Ждать `onAllReady` во всех случаях и затем считать, что пользователь получил преимущество ранней отправки shell.

#### Источники

[React: streaming API](https://react.dev/reference/react-dom/server/renderToPipeableStream)
