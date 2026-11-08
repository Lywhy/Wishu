**Ref хранит служебный ID таймера отдельно для каждого экземпляра компонента и переживает его рендеры.**

<!-- wishu:answer-block -->

### Механизм и границы

- Глобальная переменная может связать независимые экземпляры: один очистит таймер другого.

- Ref не выполняет cleanup автоматически. Ресурс нужно отменить при остановке и размонтировании.

### Пример

```jsx
timerRef.current = setTimeout(run, 500)
// При остановке:
clearTimeout(timerRef.current)
timerRef.current = null
```

### Типичная ошибка

Считать ref автоматически управляемым временем жизни таймера.

### Для закрепления

- [Чем useRef отличается от useState?](/questions/react-ref-state)

### Источник

[React: react / useRef](https://react.dev/reference/react/useRef)
