**A | B означает значение, подходящее хотя бы одному из вариантов.** Union может объединять примитивы и объектные типы. До сужения разрешены операции, безопасные для всех возможных вариантов, а не произвольная сумма их свойств.

<!-- wishu:answer-block -->

#### Как это работает

Наличие двух разных объектных форм не означает, что объект обязан содержать обе: это отличие от intersection A & B. Проверки `typeof`, in и discriminant уточняют текущий вариант. Union не является автоматически «точным объектом без лишних полей»: структурная совместимость допускает дополнительные данные в подходящих случаях.

#### Общие операции и `keyof` union

У `A | B` без сужения безопасно доступны только общие части контракта. Поэтому `keyof` union не следует автоматически принимать за объединение всех ключей его ветвей. Для отдельной операции над каждой ветвью можно использовать дистрибутивный conditional type, но полученные имена сами по себе не дают права индексировать неизвестный вариант без проверки.

```typescript
type Item = { kind: "text"; text: string } | { kind: "count"; count: number }
type CommonKeys = keyof Item // "kind"
type KeysOfEach<T> = T extends unknown ? keyof T : never
type AllKeys = KeysOfEach<Item> // "kind" | "text" | "count"
```

#### Пример

```typescript
function describe(value: string | number): string {
  if (typeof value === "string") return value.toUpperCase()
  return value.toFixed(0)
}
type Result = { ok: true; value: string } | { ok: false; error: string }
```

#### Разбор примера

Describe сначала различает варианты через typeof. В строковой ветке доступен toUpperCase, а после её возврата остаётся `number` и доступен toFixed. Тип Result описывает тот же принцип для объектов: поле ok должно вести к связанным с ним данным успешного или неуспешного исхода.

#### Источники

[TypeScript: everyday-types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
