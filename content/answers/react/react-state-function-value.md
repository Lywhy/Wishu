**Функцию-значение передают через дополнительную функцию-обёртку.** React воспринимает функцию в `useState` как инициализатор, а функцию в setter как updater, поэтому прямой аргумент может быть вызван.

<!-- wishu:answer-block -->

### Как это работает

- Для начального значения используйте `useState`(() => handler): инициализатор вернёт сам handler.

- Для замены используйте setHandler(() => nextHandler): updater вернёт новое значение, не вызывая nextHandler.

- Если нужна служебная ссылка без рендера, рассмотрите ref. Если поведение выводится из props, часто отдельное состояние с функцией вообще не требуется.

### Пример

```jsx
const [handler, setHandler] = useState(() => onSave)
function replaceHandler(nextHandler) {
  setHandler(() => nextHandler)
}
// Вызов handler() остаётся отдельным осмысленным действием.
```

### Типичная ошибка

Написать setHandler(nextHandler), ожидая сохранения функции, и неожиданно выполнить её как updater.

### Источники

- [React: react / useState](https://react.dev/reference/react/useState)
