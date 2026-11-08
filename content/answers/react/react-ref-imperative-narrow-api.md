**Узкий ref-API раскрывает нужные команды компонента, не позволяя родителю произвольно менять его внутренний DOM.**

<!-- wishu:answer-block -->

### Механизм и границы

- useImperativeHandle может вернуть focus или resetSelection вместо всего input.

- Состав handle должен учитывать зависимости используемого состояния; устаревшее замыкание в handle так же опасно, как в обычном callback. Для декларативного open обычно лучше prop.

### Пример

```jsx
useImperativeHandle(
  ref,
  () => ({
    focus() {
      inputRef.current?.focus()
    },
  }),
  [],
)
```

### Типичная ошибка

Передать весь DOM ради одной команды и затем зависеть от частной структуры потомков.

### Для закрепления

- [Чем useRef отличается от useState?](/questions/react-ref-state)

- [Зачем нужен useImperativeHandle?](/questions/react-imperative-handle)

### Источник

[React: useImperativeHandle](https://react.dev/reference/react/useImperativeHandle)
