**Фигурные скобки JSX принимают выражение, которое вычисляет значение, а if и for являются инструкциями.**

<!-- wishu:answer-block -->

### Механизм и границы

- Условие можно вынести до return или выразить тернарным оператором. Для списка обычно используют map.

- Произвольное количество инструкций поместите в обычную функцию; не превращайте сложный JSX в нечитаемую цепочку условий.

### Пример

```jsx
const content = error ? <ErrorMessage /> : <Results />
return <main>{content}</main>
```

### Типичная ошибка

Пытаться написать {if (ready) ...} непосредственно как содержимое JSX.

### Для закрепления

- [Что такое JSX и чем он отличается от HTML?](/questions/react-jsx)

### Источник

[React: javascript-in-jsx-with-curly-braces](https://react.dev/learn/javascript-in-jsx-with-curly-braces)
