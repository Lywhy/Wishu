**Компонент, который только запускает action, может выбрать саму функцию и не подписываться на меняющиеся данные store.**

<!-- wishu:answer-block -->

#### Как это работает

Если action создаётся один раз вместе со store, его ссылка обычно сохраняется между обычными merge-обновлениями. Полная замена state или переопределение action меняют этот контракт. Не оптимизируйте ценой вызова хука вне компонента.

#### Пример

```jsx
const increment = useCounter((state) => state.increment)
return <button onClick={increment}>Прибавить</button>
```

#### Разбор примера

Кнопке не нужен count: она только запускает increment. Выбор функции оставляет подписку узкой и не связывает рендер кнопки с каждым увеличением числа. Обычно action создаётся вместе со store и не меняет ссылку при merge. Если приложение переопределяет его или полностью заменяет state, новая ссылка корректно становится новым результатом selector.

#### Типичная ошибка

Деструктурировать весь useCounter() в кнопке, которой не нужно значение count.

#### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

- [Как selector и useShallow влияют на обновления Zustand-компонента?](/questions/zustand-selector-shallow)

#### Источники

[Zustand: create](https://zustand.docs.pmnd.rs/reference/apis/create)
