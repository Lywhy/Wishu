**Результат next описывает и выданный элемент, и завершение итератора. Встроенный итератор может вернуть `undefined` при завершении, поэтому value без проверки не обязано быть очередным элементом.**

<!-- wishu:answer-block -->

#### Как это работает

В TS 5.6 введён `strictBuiltinIteratorReturn` для более строгой модели завершения встроенных итераторов; он входит в strict. У пользовательского `Generator` итоговый `return` может быть другим типом, что нужно выразить в его контракте.

Проверка done отделяет полезный элемент от результата завершения; assertion вместо проверки не создаёт элемент.

#### Пример

```typescript
const iterator = new Set(["a"]).values()
const item = iterator.next()
if (!item.done) {
  item.value.toUpperCase()
}
// Пример использует доступные объявления Set/итераторов.
```

#### Разбор примера

Даже у Set со строками очередной next способен обозначать завершение. Проверка done отделяет этот исход, после чего value рассматривается как выданная строка. Чтение через assertion не восстановило бы отсутствующий элемент и могло бы привести к вызову метода у undefined.

#### Типичная ошибка

> Считать value у next безусловно элементом коллекции.

#### Для закрепления

- [Что означают три параметра Generator<Yield, Return, Next>?](/questions/ts-generator-contract)
- [Как связаны генераторы, итераторы и Symbol.iterator?](/questions/iterator-protocols)

#### Источники

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-6.html#strict-builtin-iterator-checks-and---strictbuiltiniteratorreturn)
