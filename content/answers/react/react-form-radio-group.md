**Radio одного выбора связывают общим name и сравнивают каждый value с одним состоянием выбранного значения.**

<!-- wishu:answer-block -->

### Механизм и границы

- Каждый onChange сохраняет своё значение.

- Общий name обеспечивает нативное групповое поведение; одинаковое имя у независимых групп может непреднамеренно связать их.

### Пример

```jsx
<input
  type="radio"
  name="level"
  value="basic"
  checked={level === "basic"}
  onChange={(event) => setLevel(event.target.value)}
/>
```

### Типичная ошибка

Завести независимый boolean на каждый radio и допустить противоречие выбранных значений.

### Для закрепления

- [Чем управляемое поле отличается от неуправляемого?](/questions/react-controlled-input)

### Источник

[React: components / input](https://react.dev/reference/react-dom/components/input)
