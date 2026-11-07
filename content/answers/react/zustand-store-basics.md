**`create` создаёт store и связанный React-hook.** Компоненты, использующие один экземпляр, читают общее состояние; стандартный модульный store не требует `Provider`.

<!-- wishu:answer-block -->

#### Механизм и границы

- Инициализатор возвращает данные и обычно функции действий. Set обновляет состояние, `selector` выбирает нужную часть для компонента.
- Это не то же самое, что несколько вызовов useState: они не создают независимые данные для каждого потребителя общего store.
- Отсутствие обязательного `Provider` не запрещает scoped store через `Context`. Владение экземпляром важно при нескольких виджетах и SSR.

#### Пример

```typescript
import { create } from "zustand"
type Counter = { count: number; increment: () => void }
export const useCounter = create<Counter>()((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))
```

#### Для закрепления

- [Что переиспользует пользовательский хук: состояние или логику?](/questions/react-custom-hooks)
- [Как выбрать между props, Context и внешним store?](/questions/react-state-location)

#### Источник

[Zustand: introduction](https://zustand.docs.pmnd.rs/getting-started/introduction).
