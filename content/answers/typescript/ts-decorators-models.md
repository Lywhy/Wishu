TypeScript 5.0 добавил поддержку современной модели декораторов без включения legacy-режима experimentalDecorators. У этих моделей отличаются сигнатуры и правила обработки: одинаковый символ @ не делает реализации взаимозаменяемыми.

<!-- wishu:answer-block -->

#### Как это работает

Современный декоратор получает декорируемое значение и объект context с информацией о члене и доступными операциями. Его замена должна сохранять подходящий контракт. Legacy-модель обычно работает с `target`, именем и дескриптором в зависимости от вида объявления.

Современная модель не поддерживает legacy-декораторы параметров и не совместима с `emitDecoratorMetadata` как механизмом legacy-метаданных. Проверяйте требования конкретного фреймворка и транспилятора; не меняйте флаг в существующем проекте, считая это простой синтаксической миграцией.

#### Пример

```typescript
// Современная модель TypeScript 5.0+, не legacy experimentalDecorators.
function traced<This, Args extends unknown[], R>(
  method: (this: This, ...args: Args) => R,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => R>,
) {
  return function (this: This, ...args: Args): R {
    console.log(String(context.name))
    return method.apply(this, args)
  }
}
```

#### Разбор примера

Traced получает метод и context, затем возвращает функцию с теми же `this`, Args и R. Обёртка логирует имя и передаёт исходный получатель и аргументы через apply. Такая сигнатура относится к современной модели и не совместима автоматически с legacy-декоратором, ожидающим `target` и descriptor.

#### Типичная ошибка

> Переносить legacy-декоратор или DI-метаданные в современный режим без изменения контракта.

#### Источники

[TypeScript: typescript-5-0](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#decorators)

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html)
