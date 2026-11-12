**TypeScript описывает типы полей, параметры constructor и методы поверх runtime-модели классов JavaScript.** Тип экземпляра отличается от `typeof` Class, обозначающего конструктор со статическими членами. Аннотации могут быть выведены из инициализаторов, но публичный контракт часто полезно указать явно.

<!-- wishu:answer-block -->

#### Как это работает

`strictPropertyInitialization` проверяет необходимую инициализацию полей при соответствующих настройках. Definite assignment assertion ! может обойти проверку, но не присвоит значение сам. Constructor не получает произвольную аннотацию результата как обычная функция. Порядок создания полей остаётся правилом JavaScript.

#### Пример

```typescript
class User {
  name: string
  score = 0
  static category: string = "user"
  constructor(name: string) {
    this.name = name
  }
  describe(): string {
    return this.name
  }
}
const user: User = new User("Аня")
```

#### Разбор примера

Конструктор User действительно присваивает name, score инициализируется полем, а category находится на самом классе. Тип user описывает экземпляр с его данными и методами. Восклицательный знак у неинициализированного поля не смог бы заменить эти реальные присваивания.

#### Источники

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/classes.html)
