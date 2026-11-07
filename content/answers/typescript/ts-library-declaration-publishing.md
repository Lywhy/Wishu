Нужно опубликовать исполняемые файлы и соответствующие декларации, а затем согласовать package.json с обоими наборами. Наличие сгенерированного .d.ts ещё не доказывает, что потребитель найдёт правильную точку входа.

<!-- wishu:answer-block -->

### Что проверить

- Декларации покрывают именно публичные экспорты и не ссылаются на приватные пути сборки.
- Поля types и используемые exports-условия ведут к существующим файлам в опубликованном пакете.
- Сигнатуры соответствуют runtime-экспортам и поддерживаемой версии TypeScript.
- Для разных ESM/CJS-входов учитываются их форматы и подходящие декларации.

`declaration` генерирует описания типов, `emitDeclarationOnly` позволяет выпускать только их, если JavaScript собирает другой инструмент. Такая схема не синхронизирует два конвейера автоматически.

<!-- wishu:answer-block -->

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html).

<!-- wishu:answer-block -->

### Внутренние пути в публичной декларации

Успешный emit может оставить ссылки на файлы, доступные только автору. Явно проектируйте публичные типы, проверяйте состав поставки и импорт из отдельного consumer-проекта.

```typescript
// Плохой путь в опубликованном .d.ts:
// import type { Internal } from "../../workspace-only/internal"
// Зависимость должна быть доступна реальному потребителю.
```

#### Продолжить тему

- [Как проверять типовой контракт отдельно от runtime-тестов?](/questions/ts-type-contract-tests)
- [Чем sourceMap отличается от declarationMap?](/questions/ts-source-declaration-maps)
- [Как exports и условия types влияют на выбор деклараций пакета?](/questions/ts-package-conditional-types)

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html).
