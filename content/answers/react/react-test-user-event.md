**`userEvent` моделирует взаимодействие пользователя последовательностью событий, а `fireEvent` отправляет отдельное DOM-событие.** Для обычного клика, ввода и перехода клавиатурой чаще полезнее `userEvent`.

<!-- wishu:answer-block -->

### Как это работает

- Используйте `userEvent`.setup() внутри теста и ожидайте завершения асинхронных действий через await.

- Взаимодействие может включать фокус, клавиатурные события и изменение значения. Отправка одного change не всегда воспроизводит этот контракт.

- `fireEvent` остаётся низкоуровневым инструментом для случаев, которые не покрывает модель `userEvent`. Ни один из них не заменяет настоящий браузер там, где важны layout и нативная интеграция.

### Пример

```jsx
const user = userEvent.setup()
render(<Login />)
await user.type(screen.getByLabelText("Email"), "a@example.com")
await user.click(screen.getByRole("button", { name: "Войти" }))
expect(await screen.findByText("Готово")).toBeVisible()
```

### Типичная ошибка

Забыть await у user.click и проверять интерфейс до завершения цепочки взаимодействия.

### Источники

- [Testing Library: user-event / intro](https://testing-library.com/docs/user-event/intro/)
