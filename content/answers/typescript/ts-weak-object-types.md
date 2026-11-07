**Объектный тип только с необязательными свойствами не обязательно принимает любой непустой объект. При отсутствии общих свойств TypeScript может обнаружить вероятную ошибку выбора контракта.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Это дополнительная защитная проверка, а не требование заполнить каждое optional-поле. Пустой объект обычно допустим.
- Добавлять фиктивное поле или as только для обхода диагностики - плохое исправление.
- Проверьте опечатку, назначение входа и действительно ли API должен принимать произвольный словарь.

#### Пример

```typescript
type Options = { timeout?: number }
const unrelated = { retries: 3 }
// const options: Options = unrelated // Нет общих свойств.
const empty: Options = {}
```

#### Для закрепления

- [Как optional и readonly меняют контракт свойства?](/questions/ts-property-modifiers)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-4.html#weak-type-detection).
