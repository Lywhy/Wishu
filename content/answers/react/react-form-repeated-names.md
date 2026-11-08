**`FormData`.getAll(name) возвращает все значения повторяющегося поля; get возвращает только одно.**

<!-- wishu:answer-block -->

### Механизм и границы

- Это важно для checkbox с общим name и select multiple.

- Object.fromEntries(`FormData`) теряет повторяющиеся ключи, поэтому не является универсальным преобразованием формы. Отсутствующий checkbox обычно не добавляет значение.

### Пример

```jsx
const data = new FormData(event.currentTarget)
const topics = data.getAll("topic")
const title = data.get("title")
```

### Типичная ошибка

Считать, что Object.fromEntries автоматически создаст массив для одинаковых name.

### Для закрепления

- [Чем управляемое поле отличается от неуправляемого?](/questions/react-controlled-input)

- [Как обработать отправку формы и получить её данные?](/questions/react-form-submit)

### Источник

[React: components / form](https://react.dev/reference/react-dom/components/form)
