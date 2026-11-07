**Этот режим помогает ограничить код синтаксисом, который можно удалить без собственной runtime-семантики TypeScript. Enum, parameter properties и ряд namespace-сценариев требуют иной обработки, чем простая аннотация.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Возможность появилась в TS 5.8; конкретная среда запуска также имеет собственную матрицу поддержки.
- Флаг не является преобразователем и не гарантирует наличие новых JavaScript API в runtime.
- Проверять надо одновременно синтаксис, пути импортов, формат модулей и доступные возможности среды.

#### Пример

```typescript
// Аннотация стирается:
function id(value: string): string {
  return value
}
// Parameter property требует отдельного преобразования:
// class User { constructor(public name: string) {} }
```

#### Для закрепления

- [Для чего нужен enum и какие есть альтернативы?](/questions/ts-enums)
- [Что TypeScript добавляет к типизации полей, методов и конструктора класса?](/questions/ts-class-members)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/tsconfig/erasableSyntaxOnly.html).
