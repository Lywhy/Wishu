**State creator получает set для обновления, get для текущего снимка и api с инструментами конкретного store.**

<!-- wishu:answer-block -->

### Механизм и границы

- Creator возвращает начальное состояние, часто вместе с actions.

- Не читайте get как уже готовое начальное состояние во время его собственного построения. Создание store и последующий вызов action - разные моменты.

### Пример

```jsx
const useCounter = create((set, get) => ({
  count: 0,
  increment: () => set({ count: get().count + 1 }),
}))
```

### Типичная ошибка

Вычислять начальное поле через get().ещёНеСозданноеПоле и считать creator обычным action.

### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

### Источник

[Zustand: create](https://zustand.docs.pmnd.rs/reference/apis/create)
