**Реактивные свойства store и отдельно извлекаемые actions.**

Store - реактивный объект. const { count } = store извлекает текущее значение свойства, а не подписку на будущие записи. storeToRefs создаёт refs для state, getters и добавленного реактивного состояния плагинов, пропуская методы и нереактивные поля. Actions уже связаны со store, поэтому их можно деструктурировать непосредственно. Другой корректный вариант - обращаться к store.count или создать computed(() => store.count).

<!-- wishu:answer-block -->

### Пример и разбор

```js
const cart = useCartStore()
const { items, count } = storeToRefs(cart)
const { add } = cart
```

В script items.value - массив, в шаблоне верхнеуровневый ref разворачивается автоматически.

**Типичная ошибка:** Передавать actions через storeToRefs или ожидать реактивности примитивного снимка из store.

**Главная мысль:** Состояние и getters извлекайте через storeToRefs, actions - напрямую.
