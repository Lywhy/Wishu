**Предикат value is number обещает, что false исключает number. Проверка typeof вместе с ограничением величины этого не гарантирует: большое число тоже вернёт false.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Checker доверяет явно написанному is и не доказывает полноту вашей бизнес-проверки.
- Дополнительное условие можно оставить обычным boolean либо выразить отдельным проверяемым результатом, не сужая ложную ветвь неправильно.
- Особенно опасны такие guards в partition-подобных API, которые используют оба результата.

#### Пример

```typescript
function small(value: string | number): boolean {
  return typeof value === "number" && Math.abs(value) < 10
}
// Нельзя честно заменить boolean на value is number:
// small(100) === false, хотя 100 - number.
```

#### Для закрепления

- [Как написать type guard с предикатом value is T?](/questions/ts-type-predicates)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html).
