**Дерево routes и соответствующие RouterView.**

children задаёт дочерние записи. Для отображения ребёнка в оболочке родительский компонент содержит RouterView. Относительный path добавляется к родительскому, пустой path задаёт страницу по умолчанию. Catch-all /:pathMatch(._)_ позволяет показать NotFound. У маршрута могут быть meta-данные для layout или навигации; сам Router не превращает произвольное поле meta в поведение автоматически.

<!-- wishu:answer-block -->

### Пример и разбор

```js
const routes = [
  {
    path: "/account",
    component: AccountLayout,
    children: [
      { path: "", component: AccountHome },
      { path: "settings", component: AccountSettings },
    ],
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
]
```

AccountLayout должен содержать RouterView для настроек.

**Типичная ошибка:** Задавать дочерний path с начальным /, ожидая относительный адрес, или забывать внутренний RouterView.

**Главная мысль:** Вложенность URL и место отрисовки описываются согласованно.
