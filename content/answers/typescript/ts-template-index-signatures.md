**Index signature может ограничивать ключи строковым шаблоном, например `data-${string}`. Это позволяет оставить динамическую область, не открывая любой строковый ключ.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Обычные явно объявленные поля описываются рядом с шаблонной областью.
- Шаблон ограничивает форму имени, но не валидирует содержимое суффикса по бизнес-правилам.
- Проверка применяется к типовой модели; внешние JSON-данные всё равно требуют runtime-проверки.

#### Пример

```typescript
interface Attributes {
  id: string
  [key: `data-${string}`]: string
}
const attrs: Attributes = { id: "card", "data-state": "open" }
```

#### Для закрепления

- [Как template literal types ограничивают формат строкового контракта?](/questions/ts-template-literal-patterns)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/objects.html).
