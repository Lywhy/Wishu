**Компонент, который только запускает action, может выбрать саму функцию и не подписываться на меняющиеся данные store.**

<!-- wishu:answer-block -->

### Механизм и границы

- Если action создаётся один раз вместе со store, его ссылка обычно сохраняется между обычными merge-обновлениями.

- Полная замена state или переопределение action меняют этот контракт. Не оптимизируйте ценой вызова хука вне компонента.

### Пример

```jsx
const increment = useCounter((state) => state.increment)
return <button onClick={increment}>Прибавить</button>
```

### Типичная ошибка

Деструктурировать весь useCounter() в кнопке, которой не нужно значение count.

### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

- [Как selector и useShallow влияют на обновления Zustand-компонента?](/questions/zustand-selector-shallow)

### Источник

[Zustand: create](https://zustand.docs.pmnd.rs/reference/apis/create)
