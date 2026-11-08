**ID связывает выбор с актуальной записью, не создавая независимую копию её полей в state.**

<!-- wishu:answer-block -->

### Механизм и границы

- Нужный объект вычисляют из текущей коллекции. Тогда переименование записи отражается и в панели выбора.

- Если выбранная запись удалена, определите fallback: снять выбор, показать недоступность или выбрать соседнюю.

### Пример

```jsx
const [selectedId, setSelectedId] = useState(null)
const selected = rows.find((row) => row.id === selectedId) ?? null
```

### Типичная ошибка

Хранить selectedUser целиком и забывать обновлять его после изменения коллекции users.

### Для закрепления

- [Почему нельзя изменять объект или массив в state напрямую?](/questions/react-state-immutability)

- [Когда сущности в состоянии лучше хранить по ID, а не копировать в разные ветви?](/questions/react-normalized-state)

### Источник

[React: learn / choosing-the-state-structure](https://react.dev/learn/choosing-the-state-structure)
