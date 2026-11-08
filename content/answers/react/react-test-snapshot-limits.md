**Snapshot фиксирует структуру вывода, но сам не проверяет, что пользователь смог выполнить нужное действие.**

<!-- wishu:answer-block -->

### Механизм и границы

- Большой снимок может измениться от безопасного редизайна или быть обновлён без смысловой проверки.

- Добавьте тест ввода, отправки и наблюдаемого результата. Snapshot полезен только там, где его размер и цель понятны.

### Пример

```jsx
await user.type(screen.getByLabelText("Имя"), "Анна")
await user.click(screen.getByRole("button", { name: "Сохранить" }))
expect(await screen.findByText("Сохранено")).toBeVisible()
```

### Типичная ошибка

Обновить все snapshots и считать поломанный submit исправленным.

### Для закрепления

- [Что стоит проверять в тесте React-компонента?](/questions/react-test-behavior)

### Источник

[Testing Library: guiding-principles](https://testing-library.com/docs/guiding-principles/)
