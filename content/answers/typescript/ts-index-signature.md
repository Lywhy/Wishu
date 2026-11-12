**Индексная сигнатура вроде [key: `string`]: `number` задаёт тип значений при обращении по строковому ключу.** Именованные поля, попадающие под такую сигнатуру, тоже должны быть совместимы с её значением. Числовые ключи обычного объекта связаны со строковыми из-за правил JavaScript.

<!-- wishu:answer-block -->

#### Как это работает

Сигнатура не создаёт поля и не доказывает наличие любого ключа во время выполнения. `noUncheckedIndexedAccess` добавляет `undefined` к непроверенному чтению; эта настройка не включается одним strict. Для конечного набора обязательных ключей удобнее `Record` с union ключей. Наличие элемента всё равно зависит от реальных данных.

#### Метаданные рядом со словарём

Если отдельное поле имеет другой тип, лучше выделить однородные записи во вложенную структуру. Широкий union ради одного исключения ослабляет каждое динамическое чтение.

```typescript
type Report = { title: string; values: Record<string, number> }
const report: Report = { title: "Неделя", values: { visits: 20 } }
```

#### Пример

```typescript
interface Scores {
  [name: string]: number
}
const scores: Scores = { Anna: 10 }
const score = scores["unknown"]
// С noUncheckedIndexedAccess тип score - number | undefined.
// Runtime-значение отсутствующего поля - undefined.
```

#### Разбор примера

Scores обещает числовой тип хранимых оценок, но не создаёт запись unknown. Поэтому реальное чтение отсутствующего ключа даёт undefined. `noUncheckedIndexedAccess` делает этот риск видимым в типе, после чего вызывающий код должен выбрать проверку наличия или обоснованное значение по умолчанию.

#### Источники

[TypeScript: objects](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures)

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/objects.html)
