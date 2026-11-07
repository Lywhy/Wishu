**Array.isArray подтверждает массив, но не строковый тип каждого элемента. Для контракта string[] нужно отдельно проверить элементы и учитывать, какие данные допускает ваш формат.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Рассматривайте элементы как unknown, пока их тип не подтверждён.
- Every пропускает отсутствующие позиции разрежённого массива. Для внешнего JSON это отдельный форматный контекст; для произвольного JS-массива нельзя игнорировать holes.
- Статическое утверждение string[] не выполняет такую проверку.
- В примере дополнительно требуется плотность массива, которую обычный string[] сам по себе не гарантирует. Поэтому parser возвращает новый проверенный результат или null, а не делает чрезмерно сильное обещание о ложной ветви type guard.

#### Пример

```typescript
function parseStrings(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null
  const result: string[] = []
  for (let i = 0; i < value.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(value, i)) return null
    const item: unknown = value[i]
    if (typeof item !== "string") return null
    result.push(item)
  }
  return result
}
```

#### Для закрепления

- [Как написать type guard с предикатом value is T?](/questions/ts-type-predicates)
- [Как связать результат запроса с валидатором, не обещая произвольный T?](/questions/ts-validated-api-boundary)
- [Как надёжно проверить, что значение является массивом?](/questions/array-detection)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/narrowing.html).
