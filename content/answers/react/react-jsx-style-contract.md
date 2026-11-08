**style получает объект с camelCase-свойствами; числовые значения обычно означают px, кроме безразмерных свойств.**

<!-- wishu:answer-block -->

### Механизм и границы

- Например, padding: 8 задаёт длину, а opacity: 0.5 остаётся безразмерной. Для rem или процентов нужна строка.

- CSS custom properties сохраняют исходное имя с --; в TypeScript для собственного контракта может понадобиться расширение CSSProperties.

### Пример

```jsx
<>
  <div style={{ padding: 8, width: "50%", opacity: 0.8 }} />
  <div style={{ "--accent": "brown" }} />
</>
```

### Типичная ошибка

Передать CSS-строку вместо объекта или считать каждое числовое свойство пикселями.

### Для закрепления

- [Что такое JSX и чем он отличается от HTML?](/questions/react-jsx)

### Источник

[React: components / common](https://react.dev/reference/react-dom/components/common)
