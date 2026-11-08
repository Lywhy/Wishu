**Обычный объект не является отображаемым React-содержимым; выберите его поле или преобразуйте данные в нужное представление.**

<!-- wishu:answer-block -->

### Механизм и границы

- Элемент React тоже представлен объектом, но создан по специальному контракту и не равен произвольной записи данных.

- Для отладки можно использовать JSON.stringify, однако это не готовый пользовательский интерфейс и может раскрыть лишние поля.

### Пример

```jsx
function UserName({ user }) {
  return <p>{user.name}</p>
}
// <p>{user}</p> передал бы объект вместо отображаемого значения.
```

### Типичная ошибка

Передать результат API целиком в children и искать проблему в CSS.

### Для закрепления

- [Что такое JSX и чем он отличается от HTML?](/questions/react-jsx)

- [Чем отличаются компонент, React element и React node?](/questions/react-element-node-component)

### Источник

[React: javascript-in-jsx-with-curly-braces](https://react.dev/learn/javascript-in-jsx-with-curly-braces)
