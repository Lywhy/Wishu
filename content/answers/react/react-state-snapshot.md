**Setter запрашивает обновление, но не изменяет локальную переменную уже выполняющегося рендера.** Обработчики замыкают значения того рендера, в котором были созданы, поэтому console.log сразу после setCount(count + 1) прочитает прежний count.

<!-- wishu:answer-block -->

#### Как это работает

Следующий рендер получит новое состояние. await перед setter ничего не ожидает: setter `useState` не возвращает Promise завершения. Если следующее действие связано с нажатием, нужное значение можно вычислить в самом обработчике.

#### Пример

```tsx
function Counter() {
  const [count, setCount] = useState(0)
  function increment() {
    const next = count + 1
    setCount(next)
    console.log(next)
  }
  return <button onClick={increment}>{count}</button>
}
```

#### Разбор примера

Next вычисляется из снимка обработчика и сразу доступен для console.log. Setter сообщает React о будущем состоянии, но не меняет захваченный count. Если несколько обновлений зависят друг от друга, следующий результат лучше вычислять через очередь чистых updater.

#### Типичная ошибка

> Пытаться дождаться обновления через await setCount(...). Setter `useState` не возвращает Promise завершения рендера.

#### Источники

[react.dev: state-as-a-snapshot](https://react.dev/learn/state-as-a-snapshot)
