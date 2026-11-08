**Готовый element уже содержит выбранные props, а тип компонента позволяет принимающей стороне создать элемент с собственными props.**

<!-- wishu:answer-block -->

### Механизм и границы

- Контракт слота должен быть однозначным. Не вызывайте переданный компонент как обычную функцию.

- Render prop - третий вариант: обычная функция возвращает UI по явно переданным параметрам.

### Пример

```jsx
function Header({ icon: Icon }) {
  return <Icon size={16} />
}
function Frame({ icon }) {
  return <header>{icon}</header>
}
// <Header icon={Logo} />; <Frame icon={<Logo size={20} />} />
```

### Типичная ошибка

Пытаться отрисовать тип функции как children или заново вызывать уже готовый element.

### Для закрепления

- [Что такое JSX и чем он отличается от HTML?](/questions/react-jsx)

- [Чем отличаются компонент, React element и React node?](/questions/react-element-node-component)

### Источник

[React: learn / passing-props-to-a-component](https://react.dev/learn/passing-props-to-a-component)
