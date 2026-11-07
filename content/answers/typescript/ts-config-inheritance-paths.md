**Extends позволяет переиспользовать настройки, но не означает произвольное глубокое слияние всех полей. Относительные пути разрешаются с учётом файла конфигурации, где они объявлены.**

<!-- wishu:answer-block -->

#### Механизм и границы

- Переопределённый include или exclude не стоит мысленно дописывать к базовому списку.
- В монорепозитории проверьте итоговую конфигурацию потребителя, а не только общий base-файл.
- Не рассчитывайте, что references наследуется как обычная настройка compilerOptions.

#### Пример

```typescript
// packages/app/tsconfig.json
// { "extends": "../../tsconfig.base.json", "include": ["src"] }
// Проверять нужно итоговый проект app, а не базовый файл отдельно.
```

#### Для закрепления

- [Что задаёт tsconfig.json и чем target отличается от lib?](/questions/ts-config)
- [Чем files, include и exclude отличаются от rootDir и outDir?](/questions/ts-project-file-graph)

#### Источник

[Документация TypeScript](https://www.typescriptlang.org/tsconfig/).
