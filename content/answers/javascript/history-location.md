**Location описывает текущий URL; assign или присваивание href инициирует навигацию, replace заменяет текущую запись истории.**

<!-- wishu:answer-block -->

### Как это работает

History позволяет двигаться назад и вперёд и управлять записями через pushState и replaceState без загрузки нового документа. PushState не обновляет интерфейс сам и не вызывает popstate немедленно: приложение должно отрисовать новый маршрут.

Popstate обрабатывает переходы по истории. URL для pushState ограничен тем же origin, а сервер SPA должен уметь отдавать страницу при прямом открытии маршрута.

Эти API не заменяют проверку допустимого адреса навигации.

### Пример и его разбор

```javascript
function navigateLocally(path, renderRoute) {
  history.pushState({ path }, "", path)
  renderRoute(location.pathname)
}
// window.addEventListener("popstate", ...) синхронизирует обратные переходы.
```

Функция navigateLocally выполняет два шага: добавляет запись истории и явно обновляет интерфейс. Только первый шаг оставил бы старое содержимое под новым адресом. Для Back и Forward нужен обработчик popstate, восстанавливающий согласованное состояние по текущему URL.

### Источники

[Документация](https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API)
