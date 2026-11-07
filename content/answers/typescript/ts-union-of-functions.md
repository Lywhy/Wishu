**Если значение может быть одной из нескольких функций, безопасный аргумент должен подходить каждой возможной реализации. Это отличается от одной функции, которая сама обещает обработать весь union.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Для несовместимых областей аргументов общее допустимое значение может свестись к never.
- Дискриминируйте контейнер с функцией или измените API, сохранив связь варианта и параметра.
- Приведение аргумента к never только скрывает проблему: оно не выбирает правильную runtime-функцию.

#### Пример

```typescript
type One = ((value: string) => string) | ((value: number) => number)
type Both = (value: string | number) => string | number
const stringify: Both = (value) => String(value)
// One не обещает обработать любой string | number.
```

#### Для закрепления

- [Почему callback с более узким параметром может быть небезопасен?](/questions/ts-function-variance)
- [Как типизировать связь имени события и аргументов обработчика?](/questions/ts-event-map-correlation)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/functions.html).
