**Клиентский guard скрывает экран или меняет маршрут, но право читать и изменять защищённые данные проверяется на сервере.**

<!-- wishu:answer-block -->

### Механизм и границы

- Пользователь может вручную вызвать API, изменить URL или модифицировать клиентский state.

- Loader, выполняющийся в браузере, также не является доверенной серверной границей. Серверный loader требует проверки сессии и доступа к конкретной сущности.

- Не передавайте приватные данные до проверки только потому, что экран потом скроется. Redirect решает навигацию, а не авторизацию ресурса.

### Пример

```jsx
// На сервере до чтения проекта:
const user = await requireSession(request)
await requireProjectAccess(user.id, projectId)
return loadPrivateProject(projectId)
```

### Типичная ошибка

Ограничиться `<Navigate to="/login" />` и оставить незащищённый endpoint с приватными данными.

### Для закрепления

- [Какие состояния интерфейса стоит хранить в URL и как избежать второго источника истины?](/questions/react-url-state)

- [Что делает BrowserRouter и чем клиентский переход отличается от полной загрузки документа?](/questions/react-router-browser-history)

### Источник

[React Router: sessions-and-cookies](https://reactrouter.com/explanation/sessions-and-cookies)
