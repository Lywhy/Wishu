**removeEventListener должен получить ту же функцию и соответствующий capture-контракт, которые использовались при добавлении.**

<!-- wishu:answer-block -->

#### Как это работает

Две одинаково записанные стрелочные функции являются разными объектами. Создайте обработчик внутри setup и замкните именно его в cleanup. При повторном эффекте снимется прежний обработчик, затем добавится новый.

#### Пример

```jsx
useEffect(() => {
  const handle = () => console.log(document.visibilityState)
  document.addEventListener("visibilitychange", handle)
  return () => document.removeEventListener("visibilitychange", handle)
}, [])
```

#### Разбор примера

Cleanup захватывает тот же handle, который был передан при регистрации. Новая функция с одинаковым телом не совпала бы по идентичности. При повторной настройке старый listener снимается своим cleanup, после чего создаётся новый.

#### Типичная ошибка

Передать в removeEventListener новую стрелку и оставить прежнюю подписку активной.

#### Для закрепления

- [Для чего нужен useEffect и его cleanup?](/questions/effects)

#### Источники

[React: react / useEffect](https://react.dev/reference/react/useEffect)
