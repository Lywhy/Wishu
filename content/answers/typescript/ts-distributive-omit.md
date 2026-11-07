**Стандартный Omit не обязан сохранить каждый вариант так, как ожидается от поэлементного обхода union. Для такой задачи преобразование оборачивают в распределяемый conditional type.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Причина связана с keyof всего union и способом построения результата, а не с удалением runtime-свойств.
- Если нужно сохранить дискриминатор и payload каждого варианта, применяйте Omit отдельно к каждому члену.
- Не делайте каждую utility автоматически distributive: выбор зависит от учебной и предметной цели.

#### Пример

```typescript
type DistOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never
type Input = { kind: "a"; a: string; meta: number } | { kind: "b"; b: number; meta: number }
type Output = DistOmit<Input, "meta">
```

#### Для закрепления

- [Чем Pick отличается от Omit и удаляют ли они реальные свойства?](/questions/ts-pick-omit)
- [Почему keyof union возвращает общие ключи, а не все ключи вариантов?](/questions/ts-keyof-union-keys)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/utility-types.html).
