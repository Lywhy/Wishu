**Внешняя подписка может обновлять служебную интеграцию без React-render на каждое частое изменение, если владение DOM строго определено.**

<!-- wishu:answer-block -->

### Механизм и границы

- Это полезно для координат стороннего canvas или другой императивной системы.

- Подписку освобождают в cleanup и устанавливают первоначальное значение до ожидания следующего события. Не изменяйте через подписку те же React-owned children или style, которыми независимо управляет render.

### Пример

```jsx
useEffect(() => {
  const update = (state) => canvasApi.setPosition(state.position)
  update(store.getState())
  return store.subscribe(update)
}, [store, canvasApi])
```

### Типичная ошибка

Обойти React для удобства и получить две конкурирующие системы управления одним DOM.

### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

### Источник

[Zustand: create-store](https://zustand.docs.pmnd.rs/reference/apis/create-store)
