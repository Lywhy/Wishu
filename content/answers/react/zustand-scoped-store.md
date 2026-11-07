**Создайте vanilla-store фабрикой для нужной границы и передайте его экземпляр через `Context`.** UseStore(store, `selector`) подключает компонент к выбранному экземпляру.

<!-- wishu:answer-block -->

#### Механизм и границы

- Один module-level store разделяется всеми потребителями. Два редактора с независимыми черновиками могут требовать два экземпляра.
- Владелец должен создавать store один раз на свой жизненный цикл, например через ленивый useState в клиентской оболочке. Фабрика должна быть чистой.
- Начальные props не становятся автоматически постоянной синхронизацией: отдельно определите, какие изменения входов должны обновлять существующий store.
- SSR-изоляция по запросам разобрана в общем вопросе; `Context` сам не делает singleton изолированным.

#### Пример

```typescript
const makeCounterStore = (initial: number) =>
  createStore<Counter>()((set) => ({
    count: initial,
    increment: () => set((state) => ({ count: state.count + 1 })),
  }))
// React-оболочка хранит экземпляр и передаёт его через Context.
```

#### Для закрепления

- [Почему пользовательское состояние SSR нельзя бездумно хранить в singleton-store модуля?](/questions/react-ssr-state-isolation)
- [Как Context передаёт данные и откуда берётся значение по умолчанию?](/questions/react-context)

#### Источник

[Zustand: initialize state with props](https://zustand.docs.pmnd.rs/learn/guides/initialize-state-with-props).
