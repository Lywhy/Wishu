**`cloneElement` создаёт новое описание элемента с поверхностно переопределёнными props.** Он не клонирует DOM и не делает глубокую копию состояния компонента.

<!-- wishu:answer-block -->

#### Как это работает

Непереданные props сохраняются, переданные заменяют исходные. Новый `className` заменит прежнюю строку, а обработчик не объединится со старым сам. Можно переопределить key и ref, а дополнительными children заменить прежних детей. Это способно изменить идентичность или потерять чужой ref.

Скрытое внедрение props усложняет понимание потока данных. Часто понятнее явные props, render prop или Context. Перед клонированием неизвестных children проверяют, что это element.

#### Пример

```jsx
const original = <button className="small" disabled />
const next = cloneElement(original, {
  className: "large",
  disabled: false,
})
// className будет 'large', а не 'small large'.
```

#### Разбор примера

Next получает `className` large и disabled false, а original остаётся прежним описанием. Клон не объединяет классы и не копирует состояние уже отрисованной кнопки. Любое сохранение старого обработчика или ref нужно реализовать как отдельную часть контракта.

#### Типичная ошибка

Ожидать автоматического объединения `className`, style, `onClick` или двух ref.

#### Источники

[React: react / cloneElement](https://react.dev/reference/react/cloneElement)
