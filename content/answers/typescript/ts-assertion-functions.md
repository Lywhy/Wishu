**Assertion function сообщает: если вызов нормально завершился, заявленное условие подтверждено.** Asserts value is T сужает параметр после вызова, а asserts condition подтверждает условие. В отличие от обычного guard результат не используют как `boolean` ветвления.

<!-- wishu:answer-block -->

#### Как это работает

Реализация должна бросать ошибку или иначе не продолжать нормальный путь при провале. Это исполняемая проверка, а не as-приведение. Для корректного использования важна явно доступная assertion-сигнатура; function `declaration` с аннотацией обычно делает контракт понятным. Ложное обещание снова разрушает безопасность.

#### Пример

```typescript
function assertString(value: unknown): asserts value is string {
  if (typeof value !== "string") throw new TypeError("Нужна строка")
}
function normalize(value: unknown): string {
  assertString(value)
  return value.trim()
}
```

#### Разбор примера

Неподходящий вход вызывает `throw`, поэтому до `trim` в normalize доходят лишь строки. Если убрать `throw` и оставить ту же assertion-сигнатуру, типовая модель продолжит обещать безопасность без фактического доказательства. Смысл asserts связывает нормальное продолжение с выполненным условием.

#### Источники

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
