**defineAsyncComponent и разделение кода.**

defineAsyncComponent создаёт оболочку, вызывающую loader при необходимости отрисовки. Динамический import позволяет сборщику выделить отдельный chunk; загрузчик возвращает Promise компонента. Можно задать loadingComponent, errorComponent, delay и timeout. Для поля component в конфигурации Vue Router обычно передают непосредственно функцию import, не оборачивая её в defineAsyncComponent. Suspense - отдельный механизм координации async-зависимостей, его контракт следует сверять с версией Vue.

<!-- wishu:answer-block -->

### Пример и разбор

```js
import { defineAsyncComponent } from "vue"
const Chart = defineAsyncComponent(() => import("./Chart.vue"))
// В маршруте: component: () => import('./ReportPage.vue')
```

Ошибка загрузки chunk должна иметь понятный путь восстановления.

**Типичная ошибка:** Создавать новую async-оболочку при каждом рендере или считать Suspense обработчиком всех ошибок.

**Главная мысль:** Ленивая загрузка откладывает загрузку кода, но требует состояния ожидания и ошибки.
