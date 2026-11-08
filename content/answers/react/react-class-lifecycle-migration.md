**В классах подписку обычно распределяют между `componentDidMount`, `componentDidUpdate` и `componentWillUnmount`.** В функциональном компоненте тот же внешний процесс часто описывается одним эффектом с зависимостями и cleanup.

<!-- wishu:answer-block -->

### Как это работает

- На mount подключаются к ресурсу. На update сравнивают значимый prop и переключают ресурс. На unmount освобождают его.

- При переносе группируйте код по процессу, а не по названию lifecycle-метода. Вычисляемое значение и обработчик клика не требуют эффекта только потому, что раньше были связаны с обновлением класса.

- Для измерения DOM до показа может понадобиться `useLayoutEffect`. Классы поддерживаются, но для нового кода документация рекомендует функции; это не делает все старые lifecycle-методы подходящими шаблонами для нового кода.

### Пример

```jsx
function Room({ roomId }) {
  useEffect(() => {
    const connection = connect(roomId)
    return () => connection.disconnect()
  }, [roomId])
  return <p>Комната: {roomId}</p>
}
// connect - внешний API из интеграции приложения.
```

### Типичная ошибка

Перенести `componentDidMount` в эффект с [] и забыть обработку изменения roomId.

### Источники

- [React: react / Component](https://react.dev/reference/react/Component)
