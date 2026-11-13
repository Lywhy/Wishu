**Компиляторные макросы и выполнение на экземпляр.**

defineProps, defineEmits и defineExpose - макросы script setup, их не импортируют из vue. Они преобразуются компилятором и не являются произвольными runtime-функциями для вложенных вызовов. Объявления props/emits поднимаются в модульную область, поэтому не могут зависеть от локального значения setup; импортированные объявления допустимы. Обычные функции вроде ref и computed импортировать нужно. Это отличие синтаксиса сборки от API времени выполнения.

<!-- wishu:answer-block -->

### Пример и разбор

```vue
<script setup>
import { computed } from "vue"
const props = defineProps({ count: Number })
const doubled = computed(() => (props.count ?? 0) * 2)
</script>
<template>{{ doubled }}</template>
```

Здесь props читается в getter, сохраняя реактивную зависимость.

**Типичная ошибка:** Вызывать defineProps в if или объявлять default через значение локального ref.

**Главная мысль:** Макросы script setup описывают компонент на этапе компиляции.
