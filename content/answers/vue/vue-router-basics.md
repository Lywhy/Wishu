**Таблица маршрутов, переходы и место вывода страницы.**

createRouter получает history и таблицу routes, после чего router подключается через app.use до mount. RouterLink создаёт ссылку с клиентской навигацией, RouterView выводит подходящий компонент маршрута. Для внешнего URL обычно нужен обычный a. Вложенный RouterView принадлежит компоненту родительского маршрута. Простое условное переключение компонентов не даёт автоматически history, Back/Forward и прямые ссылки.

<!-- wishu:answer-block -->

### Пример и разбор

```js
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/users", name: "users", component: UsersPage }],
})
createApp(App).use(router).mount("#app")
```

В App.vue: <RouterLink to="/users">Люди</RouterLink><RouterView />.

**Типичная ошибка:** Ожидать вывода страницы без RouterView или использовать href для каждого внутреннего перехода, перезагружая приложение.

**Главная мысль:** URL выбирает компонент через маршрутизатор.
