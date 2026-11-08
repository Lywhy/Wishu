**rerender обновляет дерево существующего корня, поэтому состояние при сохранённой идентичности обычно остаётся.** unmount и новый render создают новый экземпляр с новым локальным состоянием.

<!-- wishu:answer-block -->

### Как это работает

- Используйте rerender для проверки реакции на новые props и сохранения пользовательского черновика.

- Чтобы проверить сброс, явно измените key или размонтируйте дерево. Не считайте эти действия эквивалентом обычного обновления props.

- Оценивайте поведение: введённый текст и видимый результат. Число вызовов компонента не является надёжной заменой проверки состояния.

### Пример

```jsx
const { rerender } = render(<Editor id="a" />)
await user.type(screen.getByRole("textbox"), "черновик")
rerender(<Editor id="b" />)
// Состояние зависит от контракта Editor, а не автоматически от id.
rerender(<Editor key="b" id="b" />)
// Новый key создаёт новую идентичность.
```

### Типичная ошибка

Доказывать сброс при смене props тестом, который на самом деле каждый раз вызывает unmount и render.

### Источники

- [React: learn / preserving-and-resetting-state](https://react.dev/learn/preserving-and-resetting-state)

- [Testing Library: react-testing-library / api](https://testing-library.com/docs/react-testing-library/api/#rerender)
