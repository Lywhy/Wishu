**В поддерживаемых случаях TypeScript сохраняет связь полей, извлечённых const-деструктуризацией из discriminated union. Независимая изменяемость переменных может помешать такому анализу.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Различение должно быть выражено в самом union, а не двумя несвязанными union-полями.
- Не обещайте одинаковое поведение для произвольного rest, мутаций и любой старой версии компилятора. Поддержка этого анализа расширена в TS 4.6.
- Если корреляция потеряна, проверяйте исходный объект до разделения полей.

#### Пример

```typescript
type Message = { kind: "text"; value: string } | { kind: "count"; value: number }
function render(message: Message) {
  const { kind, value } = message
  return kind === "text" ? value.toUpperCase() : value.toFixed(0)
}
```

#### Для закрепления

- [Как discriminated union помогает проверить полноту обработки вариантов?](/questions/ts-discriminated-unions)
- [Как типизировать связь имени события и аргументов обработчика?](/questions/ts-event-map-correlation)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-6.html#control-flow-analysis-for-destructured-discriminated-unions).
