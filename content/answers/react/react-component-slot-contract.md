**Готовый element уже содержит выбранные props, а тип компонента позволяет принимающей стороне создать элемент с собственными props.**

<!-- wishu:answer-block -->

#### Как это работает

Контракт слота должен быть однозначным. Не вызывайте переданный компонент как обычную функцию. Render prop - третий вариант: обычная функция возвращает UI по явно переданным параметрам.

#### Пример

```jsx
function Header({ icon: Icon }) {
  return <Icon size={16} />
}
function Frame({ icon }) {
  return <header>{icon}</header>
}
// <Header icon={Logo} />; <Frame icon={<Logo size={20} />} />
```

#### Разбор примера

Header получает Logo как тип и сам выбирает size. Frame принимает уже созданный элемент с размером, заданным снаружи. Оба подхода допустимы, но смешение контрактов привело бы к попытке вызвать объект элемента или показать функцию как содержимое.

#### Типичная ошибка

Пытаться отрисовать тип функции как children или заново вызывать уже готовый element.

#### Для закрепления

- [Что такое JSX и чем он отличается от HTML?](/questions/react-jsx)

- [Чем отличаются компонент, React element и React node?](/questions/react-element-node-component)

#### Источники

[React: learn / passing-props-to-a-component](https://react.dev/learn/passing-props-to-a-component)
