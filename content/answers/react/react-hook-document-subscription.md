**Хук видимости документа должен прочитать текущее значение, подписаться на изменения и удалить именно эту подписку.**

<!-- wishu:answer-block -->

### Механизм и границы

- Для клиентского UI можно синхронизировать локальное состояние эффектом; для строгого контракта внешнего снимка рассмотрите `useSyncExternalStore`.

- На сервере document отсутствует. Начальное значение и гидратация должны иметь согласованную политику, а не случайный fallback.

### Пример

```jsx
useEffect(() => {
  const update = () => setVisible(document.visibilityState === "visible")
  update()
  document.addEventListener("visibilitychange", update)
  return () => document.removeEventListener("visibilitychange", update)
}, [])
```

### Типичная ошибка

Подписаться на window.resize или читать видимость один раз и считать её реактивной.

### Для закрепления

- [Для чего нужен useEffect и его cleanup?](/questions/effects)

### Источник

[React: useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)
