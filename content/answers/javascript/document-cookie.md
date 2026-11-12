**Document.cookie читает доступные текущему документу пары cookie строкой и при записи устанавливает одну cookie с её атрибутами, а не заменяет весь набор.**

<!-- wishu:answer-block -->

### Как это работает

Cookie может автоматически отправляться с подходящими HTTP-запросами по правилам домена, пути, SameSite и credentials. HttpOnly-cookie недоступна JavaScript и устанавливается сервером.

Secure ограничивает передачу защищённым соединением, SameSite влияет на межсайтовую отправку; это разные меры. Path не является надёжной границей защиты от другого кода origin.

Удаление требует согласовать имя и область cookie. Документный API синхронный, а браузерные политики могут ограничивать хранение.

### Пример и его разбор

```javascript
function setThemeCookie(theme) {
  document.cookie = `theme=${encodeURIComponent(theme)}; Path=/; SameSite=Lax`
}
// Для удаления cookie той же области:
// document.cookie = "theme=; Path=/; Max-Age=0; SameSite=Lax";
// HttpOnly из JavaScript установить или прочитать нельзя.
```

Присваивание в setThemeCookie устанавливает одну cookie, а не переписывает всю строку document.cookie. При удалении совпадает область Path, иначе могла бы удаляться другая запись с тем же именем. Для защищённой серверной сессии атрибут HttpOnly задаётся сервером.

### Источники

[MDN: API / Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
