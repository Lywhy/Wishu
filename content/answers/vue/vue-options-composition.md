**Два способа организации одного реактивного компонента.**

Options API разделяет data, methods, computed и hooks по опциям и обращается к экземпляру через this. Composition API группирует связанную логику с ref, computed и функциями; setup выполняется до монтирования, this в нём недоступен. Обычный setup должен вернуть значения для шаблона, а script setup делает это на этапе компиляции. data в Options API - функция, создающая состояние каждого экземпляра. Composition API особенно удобен для composables и TypeScript.

<!-- wishu:answer-block -->

### Пример и разбор

```js
// Options API
export default {
  data: () => ({ count: 0 }),
  methods: {
    increment() {
      this.count++
    },
  },
}
// Аналог в script setup: const count = ref(0)
```

Стрелка в methods не предоставляет this экземпляра.

**Типичная ошибка:** Использовать this в setup или механически смешивать оба стиля, не определив владельца данных.

**Главная мысль:** Выбор API меняет организацию логики, а не отменяет правила Vue.
