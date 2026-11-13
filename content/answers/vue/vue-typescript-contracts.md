**Типовой контракт компонента без подмены runtime-валидации.**

В script setup lang="ts" defineProps принимает тип входов, defineEmits - сигнатуры событий. Для DOM-ref указывают тип элемента и null, поскольку до mount его нет. В Vue 3.4 и ниже withDefaults помогает задать defaults типовым props; в Vue 3.5+ доступна реактивная деструктуризация с defaults. Vite преобразует TypeScript, но сам dev-сервер не заменяет отдельную проверку типов Vue SFC через vue-tsc.

<!-- wishu:answer-block -->

### Пример и разбор

```vue
<script setup lang="ts">
import { ref } from "vue"
const props = defineProps<{ userId: string }>()
const emit = defineEmits<{ (e: "select", id: string): void }>()
const input = ref<HTMLInputElement | null>(null)
function select() {
  emit("select", props.userId)
}
</script>
```

Указанный тип payload помогает проверить вызов emit.

**Типичная ошибка:** Приводить ответ API через as User и считать это проверкой данных во время выполнения.

**Главная мысль:** TypeScript проверяет обращения в коде, но не достоверность внешнего JSON.
