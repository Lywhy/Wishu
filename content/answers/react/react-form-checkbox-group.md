**Независимые checkbox управляются отдельными boolean либо набором выбранных ID; каждый читает свой checked.**

<!-- wishu:answer-block -->

### Механизм и границы

- Не привязывайте все checkbox к одному boolean, если выбор множественный.

- value задаёт значение контрола для отправки, а checked - текущее включение. name связывает поля с `FormData`, но не создаёт React-state.

### Пример

```jsx
<input
  type="checkbox"
  name="topic"
  value={id}
  checked={selected.includes(id)}
  onChange={(event) => toggleTopic(id, event.target.checked)}
/>
```

### Типичная ошибка

Использовать value как признак включения или мутировать массив selected на месте.

### Для закрепления

- [Чем управляемое поле отличается от неуправляемого?](/questions/react-controlled-input)

### Источник

[React: components / input](https://react.dev/reference/react-dom/components/input)
