**SkipHydration откладывает восстановление persist, позволяя сначала согласовать серверный и первоначальный клиентский UI.**

<!-- wishu:answer-block -->

### Механизм и границы

- Создавайте приватный store в scope запроса/виджета и запускайте `rehydrate` в подходящем клиентском жизненном цикле.

- До готовности отображайте согласованный placeholder либо публичное исходное состояние. После восстановления проверяйте схему и применимость данных к текущей сессии.

- SkipHydration не защищает localStorage и не делает восстановленный user ролью, которой доверяет сервер.

### Пример

```jsx
persist(creator, { name: "preferences", skipHydration: true })
// В клиентском эффекте:
void store.persist.rehydrate()
```

### Типичная ошибка

Использовать восстановленный признак isAdmin как доказательство серверного доступа.

### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

- [Почему пользовательское состояние SSR нельзя бездумно хранить в singleton-store модуля?](/questions/react-ssr-state-isolation)

- [Что сохраняет persist и почему гидратация не всегда завершается сразу?](/questions/zustand-persist-hydration)

### Источник

[Zustand: persist](https://zustand.docs.pmnd.rs/reference/middlewares/persist)
