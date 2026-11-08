**Отложенный callback подписки выполняется вне исходного стека setup, поэтому его async-ошибку нужно поймать в самом потоке операции.**

<!-- wishu:answer-block -->

### Механизм и границы

- Try/catch вокруг addEventListener не перехватит будущий reject обработчика.

- Переводите ожидаемую ошибку в состояние операции; при смене зависимости не применяйте устаревший результат. Error Boundary не является обработчиком любого Promise.

### Пример

```jsx
const handleMessage = async (message) => {
  try {
    await processMessage(message)
  } catch (error) {
    reportMessageError(error)
  }
}
```

### Типичная ошибка

Обернуть создание подписки в try/catch и оставить async callback без catch.

### Для закрепления

- [Для чего нужен useEffect и его cleanup?](/questions/effects)

### Источник

[React: Component](https://react.dev/reference/react/Component)
