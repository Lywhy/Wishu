**Сигнатура `<T>(value: T) => T` обещает обработать разные T в каждом вызове. Функция `(value: string) => string` решает более узкую задачу и не выполняет такое обещание.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Внешняя generic-фабрика может один раз выбрать T и вернуть специализированный callback.
- Generic-параметр внутри callback выбирается при его вызове и задаёт более сильный контракт.
- При проектировании API определите владельца выбора типа; перенос угловых скобок меняет смысл.

#### Пример

```typescript
type Universal = <T>(value: T) => T
type ForType<T> = (value: T) => T
const identity: Universal = (value) => value
const upper: ForType<string> = (value) => value.toUpperCase()
```

#### Для закрепления

- [Как generics сохраняют связь типов и как выводятся параметры generic-функции?](/questions/generics)
- [Почему callback с более узким параметром может быть небезопасен?](/questions/ts-function-variance)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/generics.html).
