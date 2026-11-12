**`Uppercase` и `Lowercase` преобразуют регистр всей строковой формы, `Capitalize` и `Uncapitalize` - начального символа.** Для строковых литералов результатом становятся соответствующие литеральные типы. Их можно сочетать с template literal types для производных имён.

<!-- wishu:answer-block -->

#### Как это работает

Это не вызовы преобразования реальной строки и не зависящее от локали форматирование пользовательского текста. Если runtime-код создаёт имя, он должен соответствовать объявленному правилу. Сложное расширение больших union строк может стать дорогим для проверки, поэтому контракт полезно держать осмысленно ограниченным.

#### Пример

```typescript
type Loud = Uppercase<"ready"> // "READY"
type Quiet = Lowercase<"READY"> // "ready"
type First = Capitalize<"ready"> // "Ready"
type Last = Uncapitalize<"Ready"> // "ready"
type Handler = `on${Capitalize<"click" | "change">}` // "onClick" | "onChange"
```

#### Разбор примера

Handler вычисляет только два допустимых имени: onClick и onChange. Для появления настоящих обработчиков объект нужно создать отдельно. Runtime-алгоритм построения имени должен соответствовать типовой формуле, иначе assertion способен скрыть несовпадение ожидаемого и фактического свойства.

#### Источники

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/utility-types.html)
