**Если передавать новую subscribe-функцию при каждом render, React может переподписываться, хотя источник данных не менялся.**

<!-- wishu:answer-block -->

#### Как это работает

Размещайте функцию вне компонента для общего store либо стабилизируйте её по реальному экземпляру store. Cleanup должен удалять именно созданную подписку. При смене store переподключение необходимо, поэтому «навсегда []» тоже неверно.

Отдельно обеспечьте стабильность `getSnapshot`; стабильная подписка не исправит новый объект снимка на каждом чтении.

#### Пример

```jsx
const subscribe = (listener) => store.subscribe(listener)
const getSnapshot = () => store.getSnapshot()
function View() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot)
  return <p>{snapshot.count}</p>
}
```

#### Разбор примера

Функции подписки и чтения объявлены вне View для конкретного общего store. Их ссылка не меняется при render, поэтому нет ненужного переподключения. Для заменяемого экземпляра store стабильность должна зависеть от его идентичности, а не закрепляться навсегда.

#### Типичная ошибка

Создавать подписку без возврата unsubscribe или стабилизировать callback навсегда для уже заменённого store.

#### Для закрепления

- [Для чего нужен useEffect и его cleanup?](/questions/effects)

- [Для чего предназначен useSyncExternalStore?](/questions/react-external-store)

#### Источники

[React: useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)
