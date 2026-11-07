**Selector задаёт читаемую часть store.** Для нескольких полей `useShallow` помогает сохранить результат, когда его верхнеуровневые части не изменились.

<!-- wishu:answer-block -->

#### Механизм и границы

- Чтение `useStore`() без `selector` подписывает компонент широко. Для одного примитива обычно достаточно (state) => state.count.
- В Zustand 5 `selector`, постоянно возвращающий новый объект или массив, может нарушить стабильность snapshot и привести к циклу обновлений. Используйте стабильный результат или подходящий `useShallow`.
- Shallow-сравнение не является глубокой проверкой вложенного дерева. Мутации вложенного объекта без смены ссылок оно не исправляет.

#### Пример

```tsx
import { useShallow } from "zustand/react/shallow"
const { count, increment } = useCounter(
  useShallow((state) => ({ count: state.count, increment: state.increment })),
)
```

#### Для закрепления

- [Для чего предназначен useSyncExternalStore?](/questions/react-external-store)
- [Когда useSelector обновляет компонент и почему новый объект в selector мешает?](/questions/redux-selector-equality)

#### Источник

[Zustand: use shallow](https://zustand.docs.pmnd.rs/reference/hooks/use-shallow).
