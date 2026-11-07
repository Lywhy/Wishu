**Conditional type может проверить форму кортежа и ввести типы его частей через infer. Для пустой последовательности нужна явно выбранная ветвь результата.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Readonly-вход надо учитывать в шаблоне, иначе подходящий по значениям readonly-кортеж может не совпасть.
- Обычный массив произвольной длины не обещает наличие первого элемента, как непустой кортеж.
- Сложная рекурсия требует условия завершения и понятного контракта для rest и optional-позиций.

#### Пример

```typescript
type Head<T extends readonly unknown[]> = T extends readonly [infer H, ...unknown[]] ? H : never
type Tail<T extends readonly unknown[]> = T extends readonly [unknown, ...infer R] ? R : []
type First = Head<readonly ["a", 1]> // "a"
```

#### Для закрепления

- [Как infer извлекает части типа, например параметры и результат функции?](/questions/ts-infer)
- [Что такое кортеж и чем он отличается от массива?](/questions/ts-tuples)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html).
