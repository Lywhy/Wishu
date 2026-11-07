**Нужно связать конкретный ключ K с типом T[K]. Два независимых union - keyof T и T[keyof T] - позволяют передать значение другого поля.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Generic-параметр ключа выбирается по конкретному аргументу вызова.
- Если сам K уже является union, гарантии надо оценивать отдельно: параметр не превращает любой динамический ввод в доказанную пару.
- Для набора изменений хорошо подходит union коррелированных записей, а не два раздельных массива ключей и значений.

#### Пример

```typescript
function set<T, K extends keyof T>(object: T, key: K, value: T[K]) {
  object[key] = value
}
const user = { name: "Анна", age: 20 }
set(user, "age", 21)
// set(user, "age", "21") // Не number.
```

#### Для закрепления

- [Как keyof, T[K] и K extends keyof T типизируют доступ к свойству?](/questions/ts-keyof-indexed-access)
- [Как из словаря типов получить union связанных пар ключ-значение?](/questions/ts-record-to-correlated-union)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/generics.html).
