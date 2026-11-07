**Проверка помогает сопоставлять аргументы call/apply/bind с известной сигнатурой функции. Эти методы не должны автоматически превращать типизированный вызов в произвольные any-аргументы.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Нужна конкретная сигнатура; информация уже могла быть потеряна через any или слишком широкий тип Function.
- This-параметр описывается отдельно и не становится первым runtime-аргументом обычного вызова.
- Правила runtime-привязки у стрелок остаются правилами JavaScript, типовой флаг их не меняет.

#### Пример

```typescript
function format(this: { prefix: string }, value: number) {
  return this.prefix + value.toFixed(0)
}
const render = format.bind({ prefix: "№" })
render(10)
// render("10") // Не соответствует number.
```

#### Для закрепления

- [Как явно описать this функции и контекст методов объектного литерала?](/questions/ts-this-parameter)
- [Что возвращает bind и как он связывает this и аргументы?](/questions/function-bind)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/tsconfig/strictBindCallApply.html).
