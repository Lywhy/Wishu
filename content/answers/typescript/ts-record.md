**`Record<K, T>` описывает объект с ключами K и значениями T, где K совместим со строкой, числом или символом.** Конечный union ключей требует соответствующих полей, а `Record<string, T>` задаёт открытый словарный контракт.

<!-- wishu:answer-block -->

#### Как это работает

Открытый контракт не означает, что любой ключ реально существует. `noUncheckedIndexedAccess` помогает отразить непроверенное чтение через `undefined`. Если нужен неполный конечный набор, его можно описать `Partial<Record<K, T>>`. `Record` - не runtime-`map`: сохраняются обычные правила ключей объекта.

#### Пример

```typescript
type Theme = "light" | "dark"
const labels: Record<Theme, string> = { light: "Светлая", dark: "Тёмная" }
const partial: Partial<Record<Theme, string>> = { dark: "Тёмная" }
const scores: Record<string, number> = {}
// Наличие произвольного ключа scores нужно учитывать отдельно.
```

#### Разбор примера

Labels обязан содержать light и dark, поскольку множество Theme конечно. `Partial` ослабляет это требование для каждого поля. Scores с открытым `string`-доменом не обязан заранее хранить все возможные строки, поэтому наличие конкретной оценки проверяют отдельно.

#### Источники

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/utility-types.html)
