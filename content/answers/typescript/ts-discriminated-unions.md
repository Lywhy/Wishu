**Discriminated union объединяет объектные варианты с общей меткой, имеющей разные литеральные значения.** Проверка метки сужает весь объект, делая доступными поля конкретного варианта. Это точнее, чем один объект с множеством несвязанных optional-полей.

<!-- wishu:answer-block -->

#### Как это работает

После обработки всех вариантов оставшийся тип должен стать `never`. Присваивание в `never` или вызов assertNever позволяет обнаружить добавленный, но необработанный вариант. Метка должна реально присутствовать в данных; описание union само не валидирует ответ сервера. Не стоит маскировать пропущенный вариант через as `never`.

#### Состояния без противоречий

Вместо объекта с независимыми loading, error? и data? задавайте отдельные варианты состояния: idle, loading, success с данными и error с ошибкой. Так невозможные комбинации исчезают из типизированного контракта.

Начиная с TypeScript 4.6 корреляция discriminated union сохраняется в подходящей const-деструктуризации и параметрах, которые не переназначаются. Отделение метки от остальных данных через rest или независимые изменяемые переменные не следует считать универсально безопасным.

```typescript
type Action = { kind: "count"; value: number } | { kind: "label"; value: string }
function show(action: Action) {
  const { kind, value } = action
  if (kind === "count") return value.toFixed(0)
  return value.toUpperCase()
}
```

#### Пример

```typescript
type State = { kind: "ready"; value: string } | { kind: "error"; message: string }
function render(state: State): string {
  switch (state.kind) {
    case "ready":
      return state.value
    case "error":
      return state.message
    default: {
      const impossible: never = state
      throw new Error(`Неизвестный вариант: ${impossible}`)
    }
  }
}
```

#### Разбор примера

Ready предоставляет value, error предоставляет message, и switch выбирает согласованный набор полей. После обеих ветвей state становится never. Добавление третьего kind сделает присваивание impossible ошибочным и укажет место, где нужно расширить поведение, сохраняя проверку данных на входе отдельно.

#### Источники

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
