**В callback map с телом в фигурных скобках нужен явный return; иначе получится массив undefined.**

<!-- wishu:answer-block -->

### Механизм и границы

- Круглые скобки после стрелки позволяют неявно вернуть JSX-выражение.

- key нужен непосредственному элементу результата, но добавление key не исправляет отсутствующий return.

### Пример

```jsx
return items.map((item) => <li key={item.id}>{item.title}</li>)
```

### Типичная ошибка

Написать item => { `<li />` } и ожидать, что JSX будет возвращён автоматически.

### Для закрепления

- [Что такое JSX и чем он отличается от HTML?](/questions/react-jsx)

- [Зачем React нужен key в списках?](/questions/react-keys)

### Источник

[React: learn / rendering-lists](https://react.dev/learn/rendering-lists)
