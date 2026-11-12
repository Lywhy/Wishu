**`createStore` создаёт store без React-хука, а `useStore`(store, selector) подписывает React-компонент на его снимок.**

<!-- wishu:answer-block -->

#### Как это работает

Так один API можно использовать в разных интеграциях и передавать экземпляр через Context. Не создавайте vanilla-store заново в каждом render. Срок жизни экземпляра определяет, какие потребители разделяют состояние.

#### Пример

```jsx
const counterStore = createStore(() => ({ count: 0 }))
function Count() {
  const count = useStore(counterStore, (state) => state.count)
  return <span>{count}</span>
}
```

#### Разбор примера

counterStore является обычным объектом API, а не hook. useStore добавляет React-подписку к переданному экземпляру и возвращает выбранный count. Внешний код может пользоваться тем же store без React. Создание экземпляра вне функции Count здесь сохраняет его между рендерами; для приватного SSR-состояния вместо общего модуля нужна фабрика с подходящей границей жизни.

#### Типичная ошибка

Ожидать, что plain store сам станет вызываемым React-хуком.

#### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

- [Как создать независимый Zustand-store для каждого экземпляра виджета?](/questions/zustand-scoped-store)

#### Источники

[Zustand: use-store](https://zustand.docs.pmnd.rs/reference/hooks/use-store)
