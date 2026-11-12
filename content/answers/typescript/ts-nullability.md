**При `strictNullChecks` значения `null` и `undefined` имеют отдельные типы и не подставляются автоматически вместо любого `string` или объекта.** Возможное отсутствие отражают в union, например User | `null`. До обращения к свойствам нужно сузить тип подходящей проверкой.

<!-- wishu:answer-block -->

#### Как это работает

Optional chaining безопасно читает через возможный `null`/`undefined`, а ?? задаёт значение по умолчанию только для этих двух значений. Восклицательный знак non-`null` assertion убирает отсутствие из статического типа, но не проверяет значение. Отключение `strictNullChecks` скрывает многие пути к runtime-ошибкам.

#### Пример

```typescript
function displayName(user: { name: string } | null): string {
  return user?.name ?? "гость"
}
function length(value: string | undefined): number {
  if (value === undefined) return 0
  return value.length
}
```

#### Разбор примера

DisplayName обрабатывает отсутствие пользователя через optional chaining и выбирает «гость» только при `null` или undefined. В length ранний возврат исключает `undefined` из дальнейшего пути. После этого чтение length разрешено на основании проверки, а не из-за отключения диагностики восклицательным знаком.

#### Источники

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
