**PropertyKey объединяет `string`, `number` и symbol. Но `keyof` конкретного типа может быть значительно уже, а отдельные runtime-API перечисления возвращают только часть ключей.**

<!-- wishu:answer-block -->

#### Как это работает

`Object.keys` не включает `symbol`-ключи; `Reflect.ownKeys` имеет другой контракт. Числовой доступ к обычному объекту имеет особенности строкового представления ключа, но типовая модель сохраняет различия для ряда операций.

Для строковых преобразований явно ограничивайте ключ через `K extends string`, а не используйте небезопасное утверждение.

#### Пример

```typescript
const token = Symbol("token")
type Item = { name: string; 0: number; [token]: boolean }
type Keys = keyof Item // "name" | 0 | typeof token
```

#### Разбор примера

Keys содержит строковое имя, числовой литерал и конкретный символ. Это точнее общего PropertyKey и объясняет, почему шаблонное преобразование имён нельзя применять ко всем ключам без ограничения. При реальном перечислении `Object.keys` показал бы только собственные перечисляемые строковые имена, а не весь такой union.

#### Типичная ошибка

> Считать `keyof` T всегда подтипом string.

#### Для закрепления

- [Как keyof, T[K] и K extends keyof T типизируют доступ к свойству?](/questions/ts-keyof-indexed-access)
- [Почему Object.keys возвращает string[], а не (keyof T)[]?](/questions/ts-runtime-object-keys)

#### Источники

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)
