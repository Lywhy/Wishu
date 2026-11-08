**Credentials управляет участием браузерных credentials в соответствующем обмене; для cookies важны также scope, `SameSite` и политика браузера.**

<!-- wishu:answer-block -->

### Механизм и границы

- Same-origin является обычным значением Fetch по умолчанию, include позволяет соответствующий cross-origin-сценарий.

- Include не отменяет `SameSite`, блокировку third-party cookies и требования CORS к доступному ответу.

### Сценарий

Cross-origin API с сессионной cookie требует согласованной настройки клиента, ответа сервера и cookie.

```javascript
await fetch("https://api.example.com/me", {
  credentials: "include",
})
// Для cross-origin-чтения сервер должен разрешить конкретный origin
// и credentials. Cookie также подчиняются SameSite и privacy policy.
```

### Типичная ошибка

Добавить include и ждать отправки любой cookie на любой домен.

### Для закрепления

- [Как разрешить CORS-запрос с credentials без wildcard origin?](/questions/browser-cors-credentials)

### Источники

- [Использование Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
