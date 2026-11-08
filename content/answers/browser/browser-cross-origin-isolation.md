**COOP и COEP участвуют в создании более изолированного контекста, а `crossOriginIsolated` позволяет проверить соответствующее состояние страницы.**

<!-- wishu:answer-block -->

### Механизм и границы

- COOP влияет на отношения browsing contexts, COEP - на встраивание cross-origin-ресурсов по выбранному контракту.

- Изоляция может требоваться для возможностей вроде подходящего использования `SharedArrayBuffer`, но установка заголовков не делает любой ресурс совместимым.

- Учтите popup-вход, внешние виджеты, resource headers и разрешения. Для iframe и поддерживаемых значений нужны условия конкретного браузера.

### Сценарий

Приложение включает изоляцию, но сторонний ресурс или popup-интеграция требует пересмотра своего разрешённого взаимодействия.

```http
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

Это типичная конфигурация для HTTPS-документа. COEP: `require-corp` требует подходящего CORS/CORP-контракта cross-origin-зависимостей. Проверка `window.crossOriginIsolated` и условий Permissions Policy остаётся необходимой; popup-сценарии с `window.opener` могут измениться.

### Типичная ошибка

Копировать два заголовка как универсальное ускорение страницы, не проверив потерянные связи и загрузки.

### Для закрепления

- [Как SharedArrayBuffer позволяет разделять память между агентами?](/questions/shared-array-buffer)

### Источники

- [crossOriginIsolated](https://developer.mozilla.org/en-US/docs/Web/API/Window/crossOriginIsolated)

- [COOP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Opener-Policy)

- [COEP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Embedder-Policy)
