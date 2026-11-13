**Cleanup, отмена запроса и проверка актуальности результата.**

Смена источника может запустить второй запрос до завершения первого. Cleanup предыдущего запуска отменяет транспорт и помечает результат неактуальным; проверка нужна также в catch/finally, чтобы старый запрос не сбросил новое состояние. onCleanup передаётся callback watcher. onWatcherCleanup доступен в Vue 3.5+ и регистрируется до await. Отмена запроса не обещает откат уже выполненной сервером операции.

<!-- wishu:answer-block -->

### Пример и разбор

```js
watch(
  userId,
  async (id, _, onCleanup) => {
    const controller = new AbortController()
    let active = true
    onCleanup(() => {
      active = false
      controller.abort()
    })
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`/api/users/${encodeURIComponent(id)}`, {
        signal: controller.signal,
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const result = await response.json()
      if (active) user.value = result
    } catch (cause) {
      if (active) error.value = String(cause)
    } finally {
      if (active) loading.value = false
    }
  },
  { immediate: true },
)
```

Refs userId, user, loading и error создаются в setup. Пример разобран статически, не выполнялся.

**Типичная ошибка:** Защитить только запись data, оставив старому finally возможность выключить loading нового запроса.

**Главная мысль:** Публикуйте результат только пока запрос принадлежит текущему наблюдению.
