**Разные submit-кнопки могут задавать намерение через name/value или через данные submitter; это не требует нескольких несогласованных форм.**

<!-- wishu:answer-block -->

### Механизм и границы

- `FormData`, созданная только по форме, не обязана включать данные нажатой кнопки. Современный конструктор с submitter учитывает её, но поддерживаемую среду нужно проверить.

- Для формы React/Router действие задавайте через поддерживаемый контракт; Enter может иметь иной путь выбора submitter.

### Пример

```jsx
<>
  <button type="submit" name="intent" value="draft">
    Черновик
  </button>
  <button type="submit" name="intent" value="publish">
    Опубликовать
  </button>
</>
```

### Типичная ошибка

Читать только onClick и терять семантику отправки с клавиатуры.

### Для закрепления

- [Чем управляемое поле отличается от неуправляемого?](/questions/react-controlled-input)

### Источник

[React: components / form](https://react.dev/reference/react-dom/components/form)
