**required, type и ограничения браузера могут проверять поле до submit; onInvalid позволяет отразить нарушение в React-UI.**

<!-- wishu:answer-block -->

### Механизм и границы

- Сообщение связывают с полем через aria-describedby и при необходимости aria-invalid.

- noValidate отключает автоматическую нативную проверку формы, поэтому с ним приложение должно само реализовать выбранный контракт. Серверная проверка всё равно обязательна.

### Пример

```jsx
<input
  required
  type="email"
  onInvalid={() => setInvalid(true)}
  onChange={() => setInvalid(false)}
  aria-invalid={invalid}
/>
```

### Типичная ошибка

Отключить нативную проверку, но не добавить собственную, либо считать клиентскую проверку защитой API.

### Для закрепления

- [Чем управляемое поле отличается от неуправляемого?](/questions/react-controlled-input)

### Источник

[React: components / input](https://react.dev/reference/react-dom/components/input)
