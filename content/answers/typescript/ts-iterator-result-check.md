**Результат next описывает и выданный элемент, и завершение итератора. Встроенный итератор может вернуть undefined при завершении, поэтому value без проверки не обязано быть очередным элементом.**

<!-- wishu:answer-block -->

#### Механизм и границы

- В TS 5.6 введён strictBuiltinIteratorReturn для более строгой модели завершения встроенных итераторов; он входит в strict.
- У пользовательского Generator итоговый Return может быть другим типом, что нужно выразить в его контракте.
- Проверка done отделяет полезный элемент от результата завершения; assertion вместо проверки не создаёт элемент.

#### Пример

```typescript
const iterator = new Set(["a"]).values()
const item = iterator.next()
if (!item.done) {
  item.value.toUpperCase()
}
// Пример использует доступные объявления Set/итераторов.
```

#### Для закрепления

- [Что означают три параметра Generator<Yield, Return, Next>?](/questions/ts-generator-contract)
- [Как связаны генераторы, итераторы и Symbol.iterator?](/questions/iterator-protocols)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-6.html#strict-builtin-iterator-checks-and---strictbuiltiniteratorreturn).
