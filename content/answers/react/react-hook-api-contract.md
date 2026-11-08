**Пользовательский хук возвращает обычное значение JavaScript: объект удобен для именованных полей, кортеж - для компактного устойчивого набора.**

<!-- wishu:answer-block -->

### Механизм и границы

- Не возвращайте каждый внутренний setter, если потребителю достаточно команды.

- Независимые вызовы хука не разделяют локальное состояние автоматически; возвращаемый объект не является отдельным store.

### Пример

```jsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  const toggle = () => setValue((previous) => !previous)
  return { value, toggle }
}
```

### Типичная ошибка

Заставить потребителя знать порядок десяти элементов массива или менять внутреннее состояние без правил хука.

### Для закрепления

- [Для чего нужен useEffect и его cleanup?](/questions/effects)

- [Что переиспользует пользовательский хук: состояние или логику?](/questions/react-custom-hooks)

### Источник

[React: reusing-logic-with-custom-hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
