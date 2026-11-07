**Да. TypeScript не выполняет полный анализ всех побочных эффектов произвольного вызова. Проверенное свойство может измениться через другую ссылку, хотя локальное сужение ещё выглядит допустимым.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Одна функция может удалить optional-поле или заменить его значение.
- Сохранение проверенного примитива в локальную const-переменную помогает, если последующая работа должна использовать именно этот снимок.
- Readonly-контракты полезны для ограничения операций, но не являются универсальной защитой от чужих aliases.

#### Пример

```typescript
type Box = { value?: string }
function clear(box: Box) {
  delete box.value
}
function use(box: Box) {
  if (box.value !== undefined) {
    const text = box.value
    clear(box)
    // box.value.toUpperCase() // Может обратиться к удалённому полю.
    return text.toUpperCase() // Сохранили проверенный примитив.
  }
}
```

#### Для закрепления

- [Когда сужение типа сохраняется внутри callback, а когда теряется?](/questions/ts-narrowing-closures)
- [Как optional и readonly меняют контракт свойства?](/questions/ts-property-modifiers)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/type-compatibility.html).
