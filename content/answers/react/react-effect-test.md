**Проверяют наблюдаемый эффект подписки, затем меняют её параметр и убеждаются, что прежняя подписка снята, а новая активна.** После размонтирования события старого источника не должны продолжать изменять интерфейс или вызывать пользовательский callback.

<!-- wishu:answer-block -->

#### Как это работает

Тест в StrictMode может выявить отсутствие симметрии setup/cleanup, но не стоит требовать универсального точного числа вызовов во всех режимах. Для таймеров управляют временем через средства тестовой среды и обязательно восстанавливают окружение после теста.

#### Пример

```tsx
const onUpdate = vi.fn()
const { unmount } = render(<Watcher source={source} onUpdate={onUpdate} />)
await act(async () => source.emit("first"))
expect(onUpdate).toHaveBeenCalledWith("first")
onUpdate.mockClear()
unmount()
await act(async () => source.emit("after unmount"))
expect(onUpdate).not.toHaveBeenCalled()
// Watcher подписывает onUpdate; source - управляемый тестовый EventEmitter.
```

#### Разбор примера

Сначала событие источника достигает публичного callback. После unmount новое событие уже не должно его вызвать. Такая проверка доказывает окончание владения ресурсом без требования одного фиксированного числа setup в любых React-режимах.

#### Типичная ошибка

> Убрать StrictMode из теста ради фиксированного числа setup и пропустить утечку подписки при повторном подключении.

#### Источники

[react.dev: StrictMode](https://react.dev/reference/react/StrictMode)
