**Чтение внешнего изменяемого store в render и отдельная подписка через эффект оставляют окно между снимком и подключением слушателя.**

<!-- wishu:answer-block -->

#### Как это работает

Источник может измениться в этом окне или во время конкурентной работы, и разные части UI прочитают разные версии. Context удобен для передачи экземпляра store, но сам не добавляет согласованность чтения его изменяемого поля. Используйте `useSyncExternalStore` или библиотеку на его основе.

Контракт требует стабильного снимка, корректного unsubscribe и согласованного серверного значения. Замена `useEffect` на `useLayoutEffect` не является универсальной реализацией внешнего store.

#### Пример

```jsx
const store = useContext(StoreContext)
const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot)
```

#### Разбор примера

Context передаёт конкретный экземпляр, а `useSyncExternalStore` управляет согласованным чтением его версии. Простое обращение к store.current в render не создаёт уведомлений и не закрывает окно до подписки. Два слоя выполняют разные необходимые задачи.

#### Типичная ошибка

Передать изменяемый объект через Context и считать, что чтение store.current стало реактивным и согласованным.

#### Для закрепления

- [Как Context передаёт данные и откуда берётся значение по умолчанию?](/questions/react-context)

- [Для чего предназначен useSyncExternalStore?](/questions/react-external-store)

#### Источники

[Документация](https://react.dev/reference/react/useSyncExternalStore)
