**Клавиатурный тест должен пройти последовательность фокуса и действий, а затем проверить видимый результат.**

<!-- wishu:answer-block -->

### Механизм и границы

- UserEvent.tab и keyboard помогают моделировать путь без вызова onClick напрямую.

- jsdom не доказывает реальный layout и всю браузерную модель фокуса; критичные сценарии модалок дополнительно проверяют в браузере.

### Пример

```jsx
await user.tab()
expect(screen.getByLabelText("Имя")).toHaveFocus()
await user.type(screen.getByLabelText("Имя"), "Анна")
await user.keyboard("{Enter}")
```

### Типичная ошибка

Проверить только доступность кнопки мышью и пропустить невозможность дойти до неё клавиатурой.

### Для закрепления

- [Что стоит проверять в тесте React-компонента?](/questions/react-test-behavior)

### Источник

[Testing Library: convenience](https://testing-library.com/docs/user-event/convenience/#tab)
