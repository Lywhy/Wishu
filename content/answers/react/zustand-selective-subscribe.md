**`subscribeWithSelector` добавляет выборочную подписку вне React-render.** Слушатель может реагировать на изменение выбранного значения, а не всего state.

<!-- wishu:answer-block -->

#### Как это работает

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

#### Разбор примера

Этот вариант subscribe доступен благодаря `subscribeWithSelector` и вызывает слушателя при изменении выбранной темы. applyTheme работает как внешняя интеграция, поэтому срок жизни подписки нужно определить явно. Немедленный unsubscribe в примере обозначает её завершение; в компоненте он обычно возвращается из эффекта. Начальное применение темы можно выполнить отдельно или использовать поддерживаемую настройку fireImmediately.

#### Типичная ошибка

> Регистрировать новую подписку на каждом рендере без cleanup.

#### Для закрепления

- [Чем useStore(selector) отличается от useStore.getState()?](/questions/zustand-imperative-access)

#### Источники

[Zustand: subscribe with selector](https://zustand.docs.pmnd.rs/reference/middlewares/subscribe-with-selector)
