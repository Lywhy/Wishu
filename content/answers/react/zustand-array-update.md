**Массив в обычном Zustand-state обновляют новым массивом, заменяя изменённый элемент новым объектом.**

<!-- wishu:answer-block -->

### Механизм и границы

- Set объединяет верхний уровень объекта, но не копирует автоматически массив и вложенные записи.

- Immer middleware предоставляет другой updater-контракт; не переносите его мутационный синтаксис в обычный store.

### Пример

```jsx
set((state) => ({
  rows: state.rows.map((row) => (row.id === id ? { ...row, title } : row)),
}))
```

### Типичная ошибка

Изменить state.rows[index].title и вернуть прежний массив при обычном set.

### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

### Источник

[Zustand: immutable state and merging](https://zustand.docs.pmnd.rs/learn/guides/immutable-state-and-merging)
