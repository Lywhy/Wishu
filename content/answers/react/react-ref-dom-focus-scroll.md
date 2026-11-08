**Ref нужен для императивной команды существующему DOM-узлу: установить фокус, прокрутить или измерить его.**

<!-- wishu:answer-block -->

### Механизм и границы

- State описывает, что показать; вызов focus работает с уже показанным узлом.

- Не меняйте React-управляемые children через ref ради синхронизации UI. Для условного узла дождитесь commit.

### Пример

```jsx
function revealSelected() {
  selectedRef.current?.scrollIntoView({ block: "nearest" })
}
```

### Типичная ошибка

Хранить DOM-узел в state только для вызова команды или пытаться прокрутить ещё не созданный элемент.

### Для закрепления

- [Чем useRef отличается от useState?](/questions/react-ref-state)

### Источник

[React: learn / manipulating-the-dom-with-refs](https://react.dev/learn/manipulating-the-dom-with-refs)
