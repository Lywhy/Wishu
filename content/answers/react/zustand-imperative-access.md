**Hook подписывает компонент, `getState` только возвращает текущий снимок в момент вызова.** Одно чтение `getState` не заставляет React перерисоваться при следующих изменениях.

<!-- wishu:answer-block -->

#### Механизм и границы

- GetState полезен в обработчике или внешней интеграции, когда нужен актуальный снимок. В рендере реактивное значение обычно читают через hook-`selector`.
- Функции действий тоже можно получить через `getState` и вызвать вне React. Нельзя вызывать сам hook в обычной служебной функции.
- Подписка вне React требует явной отписки. Чтение снимка и регистрация слушателя - разные операции.

#### Пример

```typescript
const count = useCounter((state) => state.count) // В компоненте
const latest = useCounter.getState().count // Одноразовое чтение
useCounter.getState().increment() // Внешний обработчик
```

#### Для закрепления

- [Для чего предназначен useSyncExternalStore?](/questions/react-external-store)

#### Источник

[Zustand: practice with no store actions](https://zustand.docs.pmnd.rs/learn/guides/practice-with-no-store-actions).
