**Императивный доступ к элементу после монтирования.**

Ссылка на элемент заполняется после монтирования и может стать null при удалении ветви v-if. В Vue 3.5+ useTemplateRef связывает ссылку по имени; для более ранних версий используется ref(null) с соответствующим именем. После включения условной ветви нужно дождаться nextTick. Для чтения данных формы обычно предпочтительнее v-model, а не чтение DOM через ref.

<!-- wishu:answer-block -->

### Пример и разбор

```vue
<script setup>
import { ref, onMounted } from "vue"
const input = ref(null)
onMounted(() => input.value?.focus())
</script>
<template><input ref="input" /></template>
```

В setup input.value изначально null.

**Типичная ошибка:** Обращаться к input.value.focus() прямо в setup или игнорировать исчезновение элемента.

**Главная мысль:** Template ref дополняет декларативный UI для операций вроде focus.
