**`hasHydrated` читает текущий статус, а `onHydrate`/`onFinishHydration` уведомляют о жизненном цикле восстановления persist.**

<!-- wishu:answer-block -->

#### Как это работает

Сам вызов `hasHydrated` не создаёт React-подписку. Для UI нужна реактивная обёртка с корректным unsubscribe и первоначальным снимком. Повторный `rehydrate` и ошибка восстановления должны учитываться отдельно; нельзя навсегда считать данные готовыми только по одному событию первой загрузки.

#### Пример

```jsx
const offStart = store.persist.onHydrate(() => setReady(false))
const offEnd = store.persist.onFinishHydration(() => setReady(true))
setReady(store.persist.hasHydrated())
// Cleanup вызывает offStart() и offEnd().
```

#### Разбор примера

Сначала устанавливаются обработчики начала и завершения, затем читается текущий статус, чтобы не ждать событие, которое уже произошло. Эти вызовы принадлежат управляемому жизненному циклу подписки и должны завершаться обеими отписками. Для ошибки восстановления нужен отдельный обработчик: отсутствие `onFinishHydration` не следует превращать в бесконечный успешный loading. Повторная `rehydrate` также может снова изменить готовность.

#### Типичная ошибка

Прочитать `hasHydrated` один раз в render и ожидать автоматического обновления UI.

#### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

- [Что сохраняет persist и почему гидратация не всегда завершается сразу?](/questions/zustand-persist-hydration)

#### Источники

[Zustand: persist](https://zustand.docs.pmnd.rs/reference/middlewares/persist)
