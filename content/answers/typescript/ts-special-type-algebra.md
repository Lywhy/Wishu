**Для обычного T `T | never` сохраняет T, `T & unknown` сохраняет T, а `T | unknown` даёт unknown. Any ведёт себя особенно и способен разрушать полезные ограничения.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Never описывает отсутствие возможного значения; unknown требует доказать допустимую операцию.
- Any не является просто ещё одним аккуратным верхним типом: многие выражения с ним теряют проверку.
- Не переносите таблицу обычных типов на conditional types механически: дистрибутивность never и ветвление по any разбираются отдельно.

#### Пример

```typescript
type A = string | never // string
type B = string & unknown // string
type C = string | unknown // unknown
type D = string | any // any
```

#### Для закрепления

- [Когда использовать unknown вместо any и чем опасно необоснованное any?](/questions/unknown-any)
- [Как отключить дистрибутивность conditional types и проверить never?](/questions/ts-distributive-never)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html).
