**Отложенный callback подписки выполняется вне исходного стека setup, поэтому его async-ошибку нужно поймать в самом потоке операции.**

<!-- wishu:answer-block -->

#### Как это работает

Try/catch вокруг addEventListener не перехватит будущий reject обработчика. Переводите ожидаемую ошибку в состояние операции; при смене зависимости не применяйте устаревший результат. Error Boundary не является обработчиком любого Promise.

#### Пример

```jsx
const handleMessage = async (message) => {
  try {
    await processMessage(message)
  } catch (error) {
    reportMessageError(error)
  }
}
```

#### Разбор примера

Catch окружает реальное await processMessage, поэтому видит поздний отказ. Обработка ошибки только в момент регистрации listener этого не обеспечила бы. Reporter также должен иметь собственный понятный контракт, чтобы не породить ещё один необработанный reject.

#### Типичная ошибка

Обернуть создание подписки в try/catch и оставить async callback без catch.

#### Для закрепления

- [Для чего нужен useEffect и его cleanup?](/questions/effects)

#### Источники

[React: Component](https://react.dev/reference/react/Component)
