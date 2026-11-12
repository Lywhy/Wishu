**Если параметр изменился, предыдущий запрос может завершиться позже нового и перезаписать результат.** Cleanup должен отменить запрос через AbortController и/или пометить его результат устаревшим. Проверять актуальность нужно для всех связанных обновлений: данных, ошибки и ожидания.

<!-- wishu:answer-block -->

#### Как это работает

fetch не отклоняет Promise только из-за HTTP 404 или 500, поэтому проверяют response.ok. Для полноценного приложения загрузчик маршрута или специализированный кеш часто лучше ручных эффектов: нужны дедупликация, повторные запросы и инвалидирование. Пример показывает принцип защиты, а не готовый кеш.

#### Пример

```tsx
useEffect(() => {
  let active = true
  const controller = new AbortController()
  async function load() {
    try {
      const response = await fetch("/api/users/" + encodeURIComponent(userId), {
        signal: controller.signal,
      })
      if (!response.ok) throw new Error("Не удалось загрузить пользователя")
      const data = await response.json()
      if (active) setUser(data)
    } catch (error) {
      if (active) setError(error)
    }
  }
  void load()
  return () => {
    active = false
    controller.abort()
  }
}, [userId])
```

#### Разбор примера

Каждый запуск получает собственные active и controller. Cleanup делает прежний ответ неактуальным и отменяет поддерживаемое ожидание. Проверка active нужна не только успеху: поздний отказ тоже не должен заменить состояние уже выбранного пользователя.

#### Типичная ошибка

> Защитить от устаревания только успешный ответ: поздний catch или finally также может испортить состояние нового запроса.

#### Источники

[React: Suspense](https://react.dev/reference/react/Suspense)
