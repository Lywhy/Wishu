**Сначала определите медленный этап: проверка, emit, bundling, редактор или runtime. Для checker исследуйте состав проекта, стоимость типов и диагностические данные компилятора.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Важны лишние файлы, повторяющиеся зависимости, глубокие conditional types и большие union.
- ExtendedDiagnostics даёт агрегаты; generateTrace помогает более детальному анализу при поддерживаемой версии.
- Не выключайте strict или всю проверку библиотек до выяснения причины. Упрощение контракта часто полезнее искусственного обхода лимита.

#### Пример

```typescript
// tsc -p tsconfig.json --extendedDiagnostics
// tsc -p tsconfig.json --generateTrace ./trace
// Трассировку и измерения выполняет пользователь.
```

#### Для закрепления

- [Как распознать типизацию, которая усложняет API без полезной гарантии?](/questions/ts-type-complexity)
- [Как ограничить рекурсивный тип и избежать чрезмерной глубины вычисления?](/questions/ts-recursive-type-budget)

#### Источник

[Материалы команды TypeScript](https://github.com/microsoft/TypeScript/wiki/Performance).
