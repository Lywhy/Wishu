**Если вход представлен кортежем, тип результата может сохранить отдельный тип каждой позиции. В широком массиве связь индекса и конкретной задачи уже потеряна.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Readonly-кортеж удобно получить через as const, если это соответствует модели данных.
- Awaited описывает разрешение отдельного значения, а форма контейнера сохраняет позиционную связь.
- Это не добавляет ограничение параллельности, отмену или типизацию всех отказов: речь только о статической форме результатов.

#### Пример

```typescript
const jobs = [Promise.resolve("name"), Promise.resolve(1)] as const
async function run() {
  const [name, count] = await Promise.all(jobs)
  return name.toUpperCase() + count.toFixed(0)
}
```

#### Для закрепления

- [Как типизировать async-функцию и результат её ожидания?](/questions/ts-async-functions)
- [Как variadic tuple types сохраняют позиции при объединении аргументов?](/questions/ts-variadic-tuples)
- [Чем Promise.all отличается от Promise.allSettled?](/questions/promise-all-settled)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/utility-types.html).
