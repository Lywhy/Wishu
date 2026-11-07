**Immer `middleware` позволяет обновлять draft внутри `set` мутационным синтаксисом.** Обычный Zustand `set` не превращает прямую мутацию в иммутабельное обновление автоматически.

<!-- wishu:answer-block -->

#### Механизм и границы

- Подключение `middleware` должно быть явным. Логика, переписанная с `createSlice`, без него может изменить прежний объект или не уведомить ожидаемых подписчиков.
- Не изменяйте опубликованные объекты через `getState`. Draft-подход не отменяет владение состоянием и правила стабильных ссылок.
- Структуры, которые Immer не обрабатывает как обычный draft, требуют знания его поддержки. Для сложного `middleware`-комбинирования проверяйте типы и порядок.

#### Пример

```typescript
import { immer } from "zustand/middleware/immer"
const useCounter = create<Counter>()(
  immer((set) => ({
    count: 0,
    increment: () =>
      set((draft) => {
        draft.count += 1
      }),
  })),
)
```

#### Для закрепления

- [Как set объединяет состояние и почему вложенный объект нужно копировать?](/questions/zustand-set-merge)
- [Что создаёт createSlice и почему в его reducer разрешена запись state.value++?](/questions/redux-slice-immer)

#### Источник

[Zustand: immer](https://zustand.docs.pmnd.rs/reference/middlewares/immer).
