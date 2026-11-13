**createPinia, defineStore и состояние приложения.**

createPinia подключается через app.use до mount. defineStore требует уникального id. Option Store задаёт state-фабрику, getters и actions; Setup Store возвращает refs, computed и функции из setup-подобного callback. В Setup Store нужно возвращать состояние, чтобы Pinia могла корректно работать с SSR, devtools и плагинами. Компоненты одной Pinia получают общее хранилище данного id; разные SSR-приложения должны иметь свои экземпляры Pinia.

<!-- wishu:answer-block -->

### Пример и разбор

```js
export const useCartStore = defineStore("cart", () => {
  const items = ref([])
  const count = computed(() => items.value.length)
  function add(item) {
    items.value.push(item)
  }
  return { items, count, add }
})
```

В main: createApp(App).use(createPinia()).mount('#app').

**Типичная ошибка:** Считать defineStore самим экземпляром или прятать нужное Pinia состояние внутри Setup Store, не возвращая его.

**Главная мысль:** DefineStore описывает хранилище, useStore получает его экземпляр в Pinia.
