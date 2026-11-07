**Persist восстанавливает выбранные данные store из storage.** Для асинхронного storage завершение восстановления отделено от создания store.

<!-- wishu:answer-block -->

#### Механизм и границы

- Partialize ограничивает сохраняемые данные. Временные loading/error обычно не нужно возвращать после перезагрузки.
- SkipHydration позволяет управлять моментом `rehydrate`. При SSR исходный клиентский снимок должен согласоваться с серверным.
- Storage не является защищённым источником: не сохраняйте там секреты и проверяйте недоверенные данные. Persist не синхронизирует сервер автоматически.

#### Пример

```typescript
persist(creator, {
  name: "study-preferences",
  partialize: (state) => ({ theme: state.theme }),
  skipHydration: true,
})
// Владелец store отдельно запускает persist.rehydrate().
```

#### Для закрепления

- [Почему пользовательское состояние SSR нельзя бездумно хранить в singleton-store модуля?](/questions/react-ssr-state-isolation)

#### Источник

[Zustand: persist](https://zustand.docs.pmnd.rs/reference/middlewares/persist).
