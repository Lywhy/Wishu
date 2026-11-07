**Instantiation expression специализирует подходящие generic-сигнатуры значения. Само по себе оно не вызывает функцию и не создаёт результат её выполнения.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Это позволяет получить специализированную функцию без дополнительной обёртки.
- Проверяйте, какие сигнатуры перегруженного значения остаются совместимыми с заданными параметрами.
- В runtime такая специализация не добавляет проверку входных данных. Возможность появилась в TypeScript 4.7.

#### Пример

```typescript
function box<T>(value: T) {
  return { value }
}
const stringBox = box<string>
const item = stringBox("ready")
// stringBox(1) // Ошибка типов.
```

#### Для закрепления

- [Как generics сохраняют связь типов и как выводятся параметры generic-функции?](/questions/generics)
- [Как объявлять перегрузки функции и какую роль играет реализация?](/questions/ts-function-overloads)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html#instantiation-expressions).
