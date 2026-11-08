**`waitFor` может многократно вызвать callback, пока проверка не перестанет выбрасывать ошибку.** Поэтому внутри размещают проверку, а не действие с побочным эффектом.

<!-- wishu:answer-block -->

### Как это работает

- Клик или отправку выполняйте один раз до `waitFor`. Иначе повторная проверка может создать дополнительные запросы или переключить UI обратно.

- Для появления элемента часто проще `findBy`. Для исчезновения используют waitForElementToBeRemoved либо queryBy в ожидаемой проверке.

- Не делайте callback пустым: он должен проверять результат. Фиксированная задержка также не доказывает, что нужное действие завершилось.

### Пример

```jsx
await user.click(screen.getByRole("button", { name: "Сохранить" }))
await waitFor(() => {
  expect(saveRequest).toHaveBeenCalledTimes(1)
})
expect(await screen.findByText("Сохранено")).toBeVisible()
```

### Типичная ошибка

Писать `waitFor(() => user.click(button))`: повторяемая попытка становится повторяемой отправкой.

### Источники

- [Testing Library: dom-testing-library / api-async](https://testing-library.com/docs/dom-testing-library/api-async/)
