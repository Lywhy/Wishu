**При объектном spread более поздняя известная запись может заменить предыдущую. Результат конструирования не следует автоматически считать пересечением типов исходных объектов.**

<!-- wishu:answer-block -->

#### Механизм и границы

- В intersection конфликт string и number способен дать невозможный тип свойства; spread с явной поздней записью имеет другую модель.
- Optional-поля и generic-источники требуют отдельного внимания: простая схема для двух конкретных литералов не описывает каждый generic-случай.
- Проверяйте, какое значение и тип реально остаются после сборки объекта.

#### Пример

```typescript
const left = { id: "a", enabled: true }
const result = { ...left, id: 1 }
const id: number = result.id
type Both = { id: string } & { id: number } // id: never
```

#### Для закрепления

- [Как intersection объединяет требования и что происходит с конфликтующими свойствами?](/questions/ts-intersection-types)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/objects.html).
