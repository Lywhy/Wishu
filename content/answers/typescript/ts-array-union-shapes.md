**В первом случае каждый элемент может быть A или B. Во втором значение должно соответствовать одному из массивных контрактов целиком: массиву A либо массиву B.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Не путайте union контейнеров с контейнером union-элементов.
- Для методов над union массивов детали вывода зависят от сигнатур и версии TypeScript; это не меняет смысл самих двух моделей.
- Если данные по условию смешанные, моделируйте смешанный массив явно, а не обходите проверку приведением.

#### Пример

```typescript
type Mixed = (string | number)[]
type Homogeneous = string[] | number[]
const mixed: Mixed = ["a", 1]
const strings: Homogeneous = ["a", "b"]
// const invalid: Homogeneous = ["a", 1]
```

#### Для закрепления

- [Как типизировать обычный, смешанный и двумерный массив?](/questions/ts-array-types)
- [Что означает union и какие операции доступны до сужения?](/questions/ts-union-types)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html).
