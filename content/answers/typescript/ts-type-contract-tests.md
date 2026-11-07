**Runtime-тест подтверждает выполнение, а типовой пример - принятие или отклонение кода выбранным checker и конфигурацией. Для библиотеки нужны оба слоя проверки.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Положительные примеры фиксируют вывод результата и допустимые вызовы.
- Отрицательные примеры с @ts-expect-error должны соответствовать конкретному запрету; посторонняя ошибка на строке может замаскировать изменение контракта.
- Фиксируйте версию и настройки. Улучшение вывода в новой версии способно изменить ожидания без изменения runtime.

#### Пример

```typescript
function acceptsId(id: string) {
  return id
}
acceptsId("u1")
// @ts-expect-error: числовой ID не входит в контракт
acceptsId(1)
// Это пример для проверки пользователем, здесь он не запускался.
```

#### Для закрепления

- [Чем @ts-ignore отличается от @ts-expect-error?](/questions/ts-diagnostic-directives)
- [Как публиковать библиотеку, чтобы её JavaScript и декларации описывали один API?](/questions/ts-library-declaration-publishing)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html).
