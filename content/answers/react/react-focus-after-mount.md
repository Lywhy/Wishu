**setOpen(true) запрашивает новый рендер, но не создаёт DOM-узел прямо в текущем обработчике.** Доступный для фокуса узел появляется после commit.

<!-- wishu:answer-block -->

### Как это работает

- Для условного поля можно использовать стабильный callback ref, который получит смонтированный узел.

- Другой вариант - эффект, реагирующий на open. `useLayoutEffect` нужен, если важно выполнить действие до показа; обычный `useEffect` часто достаточен.

- Не переводите фокус на каждом рендере: это мешает вводу. Для диалогов дополнительно продумывают возврат фокуса и клавиатурную навигацию, обычно через готовую доступную библиотеку.

### Пример

```jsx
function focusWhenMounted(node) {
  node?.focus()
}
function Search({ open }) {
  return open ? <input ref={focusWhenMounted} aria-label="Поиск" /> : null
}
```

### Типичная ошибка

После setOpen(true) сразу вызвать inputRef.current.focus() или подобрать случайную задержку таймера.

### Источники

- [React: learn / manipulating-the-dom-with-refs](https://react.dev/learn/manipulating-the-dom-with-refs)
