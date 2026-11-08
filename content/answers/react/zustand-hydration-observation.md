**HasHydrated читает текущий статус, а onHydrate/onFinishHydration уведомляют о жизненном цикле восстановления persist.**

<!-- wishu:answer-block -->

### Механизм и границы

- Сам вызов hasHydrated не создаёт React-подписку. Для UI нужна реактивная обёртка с корректным unsubscribe и первоначальным снимком.

- Повторный `rehydrate` и ошибка восстановления должны учитываться отдельно; нельзя навсегда считать данные готовыми только по одному событию первой загрузки.

### Пример

```jsx
const offStart = store.persist.onHydrate(() => setReady(false))
const offEnd = store.persist.onFinishHydration(() => setReady(true))
setReady(store.persist.hasHydrated())
// Cleanup вызывает offStart() и offEnd().
```

### Типичная ошибка

Прочитать hasHydrated один раз в render и ожидать автоматического обновления UI.

### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

- [Что сохраняет persist и почему гидратация не всегда завершается сразу?](/questions/zustand-persist-hydration)

### Источник

[Zustand: persist](https://zustand.docs.pmnd.rs/reference/middlewares/persist)
