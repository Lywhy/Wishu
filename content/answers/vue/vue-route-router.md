**Текущее местоположение и команды навигации.**

useRoute возвращает реактивное описание текущего маршрута: params, query, name, meta. useRouter возвращает экземпляр маршрутизатора с push, replace и go. push добавляет запись history, replace заменяет текущую, что удобно при изменении фильтра без лишних шагов Back. При навигации по имени params формируют путь; при явном path params игнорируются. URL-параметры нужно проверять и преобразовывать к доменным типам.

<!-- wishu:answer-block -->

### Пример и разбор

```js
const route = useRoute()
const router = useRouter()
await router.push({ name: "user", params: { id: "42" } })
await router.replace({ query: { ...route.query, page: "2" } })
```

Маршрут user должен быть объявлен с path: '/users/:id'.

**Типичная ошибка:** Мутировать route.params как способ перехода или ожидать от push наличия успешно загруженных данных страницы.

**Главная мысль:** Route описывает адрес, router управляет переходами.
