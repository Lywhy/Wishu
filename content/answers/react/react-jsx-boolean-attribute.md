**disabled={false} передаёт boolean false, а disabled="false" - непустую строку, которая не отключает булев атрибут.**

<!-- wishu:answer-block -->

### Механизм и границы

- Для нативных boolean props передавайте boolean. Само наличие disabled в JSX означает true.

- Это правило не следует переносить на aria-* автоматически: ARIA имеет собственные строковые значения, например aria-expanded="false".

### Пример

```jsx
<>
  <button disabled={saving}>Сохранить</button>
  <button disabled={false}>Доступна</button>
</>
```

### Типичная ошибка

Преобразовать boolean через String и передать результат в disabled.

### Для закрепления

- [Что такое JSX и чем он отличается от HTML?](/questions/react-jsx)

### Источник

[React: components / common](https://react.dev/reference/react-dom/components/common)
