**Флаг replace=true заменяет весь снимок, поэтому отсутствующие в next поля, включая actions, исчезают.**

<!-- wishu:answer-block -->

### Механизм и границы

- Обычный set для объектного state выполняет поверхностное объединение; полная замена - явное другое поведение.

- Для reset используйте продуманный начальный снимок, содержащий нужный API, а не случайный объект из storage.

### Пример

```jsx
store.setState({ count: 1 }, true)
// Если increment был частью state, в новом снимке его больше нет.
```

### Типичная ошибка

Восстановить persisted-данные с replace=true и затем потерять методы store.

### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

- [Как set объединяет состояние и почему вложенный объект нужно копировать?](/questions/zustand-set-merge)

### Источник

[Zustand: create-store](https://zustand.docs.pmnd.rs/reference/apis/create-store)
