**Mixin-фабрика принимает подходящий конструктор и возвращает класс, расширяющий его возможностями. Важен тип конструктора, а не только интерфейс уже созданного экземпляра.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Ограничение описывает, какие экземпляры можно расширять; не обещайте совместимость любого exotic-конструктора.
- Нужно учитывать передачу аргументов, поля и ограничения private/protected в выбранном паттерне.
- Если наследование не нужно, композиция объектов может дать более простой проверяемый контракт.
- Any[] в типичном ограничении mixin-конструктора - технический паттерн сигнатуры rest; это не повод терять точные типы всего публичного API.

#### Пример

```typescript
type Constructor<T = object> = new (...args: any[]) => T
function Named<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    name = "item"
  }
}
const Item = Named(
  class {
    id = 1
  },
)
const value = new Item() // id и name
```

#### Для закрепления

- [Чем тип экземпляра класса отличается от typeof Class?](/questions/ts-constructor-instance-sides)
- [Когда generic-параметру нужно extends и когда ограничение избыточно?](/questions/ts-generic-constraints)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/classes.html).
