TypeScript проверяет импорт по декларациям и выбранной модели модулей, а реальный загрузчик применяет свои правила ESM/CJS. Совпадение типов не означает, что любая форма default или named import поддерживается фактическим runtime.

<!-- wishu:answer-block -->

allowSyntheticDefaultImports влияет на проверку допустимости некоторых default-импортов, но сам не добавляет runtime-обёртки. esModuleInterop также влияет на проверки и при соответствующем emit может генерировать вспомогательные конструкции; если TypeScript не генерирует JS, поведение определяет другой инструмент.

В Node-ориентированных режимах учитывайте расширения .mts/.cts, package.json type и соответствующие .d.mts/.d.cts-декларации. Не переносите поведение bundler на прямой запуск Node без проверки его контракта.

<!-- wishu:answer-block -->

### Соответствие расширений

| Исходник | Формат | Декларация |
| --- | --- | --- |
| .mts | ESM | .d.mts |
| .cts | CommonJS | .d.cts |

Формат обычного .ts в Node-ориентированных режимах зависит также от окружения package.json.

<!-- wishu:answer-block -->

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/modules/appendices/esm-cjs-interop.html).
