**Хук видимости документа должен прочитать текущее значение, подписаться на изменения и удалить именно эту подписку.**

<!-- wishu:answer-block -->

#### Как это работает

Для клиентского UI можно синхронизировать локальное состояние эффектом; для строгого контракта внешнего снимка рассмотрите `useSyncExternalStore`. На сервере document отсутствует. Начальное значение и гидратация должны иметь согласованную политику, а не случайный fallback.

#### Пример

```jsx
useEffect(() => {
  const update = () => setVisible(document.visibilityState === "visible")
  update()
  document.addEventListener("visibilitychange", update)
  return () => document.removeEventListener("visibilitychange", update)
}, [])
```

#### Разбор примера

Update сразу читает актуальную видимость и затем реагирует на события документа. Cleanup снимает ту же функцию. Такой клиентский пример предполагает выбранное начальное состояние; для SSR и строгой согласованности снимков нужен отдельный серверный контракт.

#### Типичная ошибка

Подписаться на window.resize или читать видимость один раз и считать её реактивной.

#### Для закрепления

- [Для чего нужен useEffect и его cleanup?](/questions/effects)

#### Источники

[React: useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)
