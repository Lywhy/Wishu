**Unique symbol описывает идентичность конкретного символа, а не любого значения Symbol. Его можно использовать как отдельный ключ и как часть номинально различимого контракта.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Ссылка на такой тип обычно записывается через typeof конкретного const-символа.
- Разные символы не становятся одним ключом из-за одинакового описания.
- Объявление `declare const` описывает наличие значения, но не создаёт его в runtime. Для настоящего доступа нужен реальный символ.

#### Пример

```typescript
const id = Symbol("id")
type Entity = { [id]: string }
const entity: Entity = { [id]: "u1" }
type IdKey = typeof id
```

#### Для закрепления

- [Как branded types защищают от смешивания одинаковых по форме идентификаторов?](/questions/ts-branded-identifiers)
- [Что такое Symbol и где его используют?](/questions/symbol)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/symbols.html).
