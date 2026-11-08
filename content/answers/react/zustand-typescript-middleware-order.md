**Middleware могут расширять сигнатуры set и API store, поэтому их порядок влияет на выведенные mutator-типы и доступные аргументы.**

<!-- wishu:answer-block -->

### Механизм и границы

- Например, devtools расширяет set для имени action, а immer меняет updater-контракт. Документация рекомендует располагать devtools снаружи соответствующей композиции, чтобы его изменение типов не потерялось.

- Не лечите ошибку any или двойным assertion: проверьте порядок и тип StateCreator для slices.

- Runtime-композиция и типовая композиция должны описывать один порядок; рекомендации зависят от подключённых middleware.

### Пример

```tsx
const useStore = create<State>()(devtools(immer(creator)))
// creator типизируется под фактическую композицию, а не обходится через any.
```

### Типичная ошибка

Скопировать типы slices из другой цепочки middleware и скрыть несовместимость утверждением.

### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

- [Как типизировать данные и actions Zustand через create<State>()()?](/questions/zustand-typescript-store)

### Источник

[Zustand: advanced-typescript](https://zustand.docs.pmnd.rs/learn/guides/advanced-typescript)
