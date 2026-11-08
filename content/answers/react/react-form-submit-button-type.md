**У нативной button внутри формы тип по умолчанию обычно submit; вспомогательной кнопке явно нужен type="button".**

<!-- wishu:answer-block -->

### Механизм и границы

- В React это поведение платформы сохраняется. Обёртка Button тоже должна осмысленно передавать type.

- Отправку лучше обрабатывать на form, чтобы работали Enter и доступные способы запуска.

### Пример

```jsx
<form onSubmit={save}>
  <button type="button" onClick={openHelp}>
    Подсказка
  </button>
  <button type="submit">Сохранить</button>
</form>
```

### Типичная ошибка

Привязать отправку только к onClick одной кнопки и забыть нативную отправку формы.

### Для закрепления

- [Чем управляемое поле отличается от неуправляемого?](/questions/react-controlled-input)

### Источник

[React: components / form](https://react.dev/reference/react-dom/components/form)
