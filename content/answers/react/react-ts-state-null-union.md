**Инициализация null может вывести слишком узкий тип состояния; для будущего объекта задайте явный union.**

<!-- wishu:answer-block -->

### Механизм и границы

- Это описание допустимых состояний, а не создание объекта или проверка ответа API.

- Перед чтением полей сузьте null. Для запроса со статусами можно выбрать discriminated union вместо набора несвязанных полей.

### Пример

```tsx
type User = { id: string; name: string }
const [user, setUser] = useState<User | null>(null)
const title = user ? user.name : "Гость"
```

### Типичная ошибка

Убрать null через утверждение типа и затем читать поле до загрузки данных.

### Для закрепления

- [Что такое JSX и чем он отличается от HTML?](/questions/react-jsx)

### Источник

[React: typescript](https://react.dev/learn/typescript)
