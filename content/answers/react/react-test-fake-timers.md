**Fake timers заменяют реальное время управляемой очередью таймеров.** При совместной работе с `userEvent` нужно передать способ продвижения времени и восстановить среду после теста.

<!-- wishu:answer-block -->

#### Как это работает

В тестовом runner включают виртуальные таймеры до работы, которая их создаёт. Для Vitest и Jest используются соответствующие API. Передайте advanceTimers в `userEvent.setup`. Не отключайте задержки случайным delay: null только для устранения зависания.

Продвигайте время в act, когда таймер обновляет React, и очищайте ресурсы. Обычно оставшиеся таймеры обрабатывают перед возвратом real timers; бесконечный interval требует осмысленной очистки.

#### Пример

```jsx
vi.useFakeTimers()
const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
// render и пользовательское действие находятся здесь.
await act(async () => {
  await vi.advanceTimersByTimeAsync(300)
})
// В afterEach после cleanup компонентов:
vi.runOnlyPendingTimers()
vi.useRealTimers()
```

#### Разбор примера

UserEvent получает механизм продвижения того же виртуального времени, которое использует runner. Таймер debounce можно затем сдвинуть управляемо. Очистка компонентов, ожидающих callback и возврат real timers должны завершить сценарий, не передавая ресурсы следующему тесту.

#### Типичная ошибка

Включить fake timers и ждать реального истечения debounce либо оставить виртуальные таймеры следующему тесту.

#### Источники

[Testing Library: docs / using-fake-timers](https://testing-library.com/docs/using-fake-timers/)
