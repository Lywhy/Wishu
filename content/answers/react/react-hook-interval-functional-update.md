**Интервал может передавать в setter чистый updater, не читая захваченный count из первого рендера.**

<!-- wishu:answer-block -->

### Механизм и границы

- Тогда изменение count не становится причиной пересоздания самого интервала.

- Другие читаемые props, например шаг или скорость, всё равно требуют корректного контракта зависимостей. Не исключайте их только ради [].

### Пример

```jsx
useEffect(() => {
  const timer = setInterval(() => setCount((value) => value + 1), delay)
  return () => clearInterval(timer)
}, [delay])
```

### Типичная ошибка

Оставить setCount(count + 1) в эффекте с [] и зафиксировать первое значение.

### Для закрепления

- [Для чего нужен useEffect и его cleanup?](/questions/effects)

- [Что такое устаревшее замыкание в React?](/questions/react-stale-closures)

### Источник

[React: react / useEffect](https://react.dev/reference/react/useEffect)
