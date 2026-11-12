**Middleware могут расширять сигнатуры set и API store, поэтому их порядок влияет на выведенные mutator-типы и доступные аргументы.**

<!-- wishu:answer-block -->

#### Как это работает

Например, devtools расширяет set для имени action, а immer меняет updater-контракт. Документация рекомендует располагать devtools снаружи соответствующей композиции, чтобы его изменение типов не потерялось. Не лечите ошибку any или двойным assertion: проверьте порядок и тип StateCreator для slices.

Runtime-композиция и типовая композиция должны описывать один порядок; рекомендации зависят от подключённых middleware.

#### Пример

```tsx
const useStore = create<State>()(devtools(immer(creator)))
// creator типизируется под фактическую композицию, а не обходится через any.
```

#### Разбор примера

В композиции devtools(immer(creator)) внешняя обёртка учитывает расширения API внутренней. Devtools добавляет подписи действий к set, а Immer меняет допустимую форму updater. При иной композиции или отдельно типизированных slices необходимо согласовать mutator-параметры StateCreator. Приведение к any скрывает несоответствие, но не делает фактический порядок обёрток правильным.

#### Типичная ошибка

Скопировать типы slices из другой цепочки middleware и скрыть несовместимость утверждением.

#### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

- [Как типизировать данные и actions Zustand через `create<State>()()`?](/questions/zustand-typescript-store)

#### Источники

[Zustand: advanced-typescript](https://zustand.docs.pmnd.rs/learn/guides/advanced-typescript)
