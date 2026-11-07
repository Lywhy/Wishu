**SubscribeWithSelector добавляет выборочную подписку вне React-render.** Слушатель может реагировать на изменение выбранного значения, а не всего state.

<!-- wishu:answer-block -->

#### Механизм и границы

- Middleware подключают при создании store. Не переносите его расширенную сигнатуру subscribe на обычный store без подключения.
- Subscribe возвращает unsubscribe. Освобождайте его при завершении интеграции или в cleanup эффекта.
- Подписчик, который сам пишет в store, может запустить цепочку обновлений. Сузьте условие и не создавайте бесконечный цикл.
- Для отображения в React обычно удобнее hook-`selector`; ручная подписка не должна дублировать его без причины.

#### Пример

```typescript
const unsubscribe = store.subscribe(
  (state) => state.theme,
  (theme, previous) => applyTheme(theme),
)
// Store создан с subscribeWithSelector.
unsubscribe() // Когда интеграция больше не нужна.
```

#### Для закрепления

- [Чем useStore(selector) отличается от useStore.getState()?](/questions/zustand-imperative-access)

#### Источник

[Zustand: subscribe with selector](https://zustand.docs.pmnd.rs/reference/middlewares/subscribe-with-selector).
