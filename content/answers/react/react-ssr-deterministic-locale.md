**Первый клиентский render должен воспроизвести серверный вывод; Date.now, Math.random и разные locale/timezone могут нарушить это условие.**

<!-- wishu:answer-block -->

### Механизм и границы

- Передайте серверное исходное значение либо одинаковые параметры форматирования.

- Персональное браузерное представление можно включить после mount с согласованным placeholder. suppressHydrationWarning - узкое исключение, а не синхронизация данных.

### Пример

```jsx
const formatted = new Intl.DateTimeFormat("ru-RU", {
  timeZone: "UTC",
  dateStyle: "short",
}).format(new Date(isoDate))
```

### Типичная ошибка

Форматировать одну дату в локальной серверной и браузерной зоне и ожидать одинаковую строку.

### Для закрепления

- [Что такое гидратация и почему возникает hydration mismatch?](/questions/react-hydration)

### Источник

[React: client / hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot)
