**Сброс текущего store и удаление `persist`-storage - разные операции.** ClearStorage не означает автоматический сброс уже загруженного состояния в памяти.

<!-- wishu:answer-block -->

#### Механизм и границы

- Внутри creator можно определить reset через `set`(store.getInitialState()). Начальный объект нельзя предварительно мутировать, иначе он перестанет быть надёжной базой.
- При logout спроектируйте очистку пользовательских данных, persisted копии и незавершённых запросов. Поздний ответ не должен вернуть данные прежней сессии.
- В тестах полезен свежий экземпляр store на сценарий или контролируемый reset вместе с отписками. Не смешивайте данные разных проверок общим singleton.
- Set с `replace`: true требует полного состояния, включая actions, если они хранятся в store.

#### Пример

```typescript
const useSession = create<SessionStore>()((set, get, store) => ({
  user: null,
  reset: () => set(store.getInitialState()),
}))
// Для persist очистку storage и порядок операций проектируют отдельно.
```

#### Для закрепления

- [Что сохраняет persist и почему гидратация не всегда завершается сразу?](/questions/zustand-persist-hydration)
- [Как писать async-действия Zustand и защищаться от устаревшего ответа?](/questions/zustand-async-actions)

#### Источник

[Zustand: how to reset state](https://zustand.docs.pmnd.rs/learn/guides/how-to-reset-state).
