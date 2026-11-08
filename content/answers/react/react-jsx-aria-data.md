_*aria-* и data-_ в JSX сохраняют написание с дефисами; их не преобразуют в ariaLabel и dataId.**

<!-- wishu:answer-block -->

### Механизм и границы

- `className` и htmlFor - отдельные React-имена распространённых HTML-атрибутов.

- data-* хранит прикладные метки, а aria-* описывает доступность. Произвольная ARIA-метка не заменяет корректную семантику элемента.

### Пример

```jsx
<button aria-label="Закрыть" data-panel-id="settings" type="button">
  ×
</button>
```

### Типичная ошибка

Писать ariaLabel: визуально кнопка останется, но доступное имя не будет задано ожидаемым атрибутом.

### Для закрепления

- [Что такое JSX и чем он отличается от HTML?](/questions/react-jsx)

### Источник

[React: components / common](https://react.dev/reference/react-dom/components/common)
