**Наблюдение должно следовать за конкретным DOM-узлом: при его замене отключают прежний ресурс и подключают новый.**

<!-- wishu:answer-block -->

#### Как это работает

В React 19 callback ref может вернуть cleanup для прикрепления. Он удобен, когда один и тот же компонент переключает условные узлы без собственного unmount. Не рассчитывайте, что эффект с [] узнает о каждой замене ref.current. Стабильность callback предотвращает ненужные повторные прикрепления.

#### Пример

```jsx
const attach = useCallback(
  (node) => {
    if (!node) return
    const observer = new ResizeObserver(onResize)
    observer.observe(node)
    return () => observer.disconnect()
  },
  [onResize],
)
```

#### Разбор примера

Attach создаёт observer для полученного узла и возвращает соответствующий disconnect. При замене узла React завершает прежнее прикрепление и начинает новое. Изменение onResize тоже меняет callback и требует осмысленной повторной регистрации.

#### Типичная ошибка

Продолжать наблюдать удалённый элемент после переключения условной ветки.

#### Для закрепления

- [Чем useRef отличается от useState?](/questions/react-ref-state)

- [Как callback ref помогает учитывать динамические DOM-узлы и очищать связанные ресурсы?](/questions/react-callback-ref-cleanup)

#### Источники

[Документация](https://react.dev/reference/react-dom/components/common)
