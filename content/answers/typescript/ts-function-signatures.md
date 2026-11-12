**Тип функции содержит типы параметров и результата.** Его можно записать стрелочной сигнатурой в type или call signature внутри interface. Имена параметров помогают читать контракт, но не обязаны совпадать с именами реализации.

<!-- wishu:answer-block -->

#### Как это работает

Результат часто выводится из `return`; явная аннотация фиксирует публичный контракт и обнаруживает случайный неподходящий возврат. Она не выполняет проверку результата в runtime. Тип функции полезно отличать от фактического объекта-функции с возможными дополнительными свойствами.

#### Функция с полями и конструктор

Call signature можно сочетать с собственными свойствами объекта. Construct signature с new описывает создание экземпляра, а не обычный вызов. Их нельзя подменять друг другом только потому, что в JavaScript оба связаны с функциями.

```typescript
interface Parser {
  (text: string): number
  description: string
}
interface Clock {
  now(): number
}
type ClockConstructor = new (offset: number) => Clock
```

Контракт ClockConstructor относится к значению-конструктору. Сам Clock описывает экземпляр и не создаёт класс.

#### Пример

```typescript
type Formatter = (value: number) => string
interface FormatterContract {
  (value: number): string
}
const format: Formatter = (value) => value.toFixed(2)
const same: FormatterContract = format
function double(value: number) {
  return value * 2
} // результат number
```

#### Разбор примера

Format получает параметр `number` из ожидаемой сигнатуры, а toFixed возвращает string. Та же функция подходит FormatterContract, поскольку способ объявления типа не меняет форму вызова. Для объекта с дополнительным description это поле пришлось бы действительно создать, а не только объявить в интерфейсе.

#### Источники

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/functions.html)
