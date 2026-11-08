**removeEventListener должен получить ту же функцию и соответствующий capture-контракт, которые использовались при добавлении.**

<!-- wishu:answer-block -->

### Механизм и границы

- Две одинаково записанные стрелочные функции являются разными объектами.

- Создайте обработчик внутри setup и замкните именно его в cleanup. При повторном эффекте снимется прежний обработчик, затем добавится новый.

### Пример

```jsx
useEffect(() => {
  const handle = () => console.log(document.visibilityState)
  document.addEventListener("visibilitychange", handle)
  return () => document.removeEventListener("visibilitychange", handle)
}, [])
```

### Типичная ошибка

Передать в removeEventListener новую стрелку и оставить прежнюю подписку активной.

### Для закрепления

- [Для чего нужен useEffect и его cleanup?](/questions/effects)

### Источник

[React: react / useEffect](https://react.dev/reference/react/useEffect)
