**GetSnapshot должен возвращать тот же снимок, пока данные store не изменились; новый объект на каждом чтении выглядит как постоянное изменение.**

<!-- wishu:answer-block -->

### Механизм и границы

- React сравнивает снимки через `Object.is`. Для изменяемого внутреннего хранилища создавайте и кешируйте неизменяемый снимок при реальном обновлении.

- Snapshot должен быть согласованным целым, а не набором чтений, которые могут принадлежать разным версиям.

- При SSR getServerSnapshot должен соответствовать данным начальной гидратации. Исправлять цикл пустыми зависимостями `useEffect` вместо контракта store нельзя.

### Пример

```jsx
let snapshot = { version: 0, items: [] }
const getSnapshot = () => snapshot
// При обновлении: snapshot = { version: snapshot.version + 1, items: nextItems }
```

### Типичная ошибка

Возвращать { ...store } каждый раз из getSnapshot, даже когда store не менялся.

### Для закрепления

- [Для чего нужен useEffect и его cleanup?](/questions/effects)

- [Для чего предназначен useSyncExternalStore?](/questions/react-external-store)

### Источник

[React: useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)
