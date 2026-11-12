**Первый клиентский render должен воспроизвести серверный вывод; Date.now, Math.random и разные locale/timezone могут нарушить это условие.**

<!-- wishu:answer-block -->

#### Как это работает

Передайте серверное исходное значение либо одинаковые параметры форматирования. Персональное браузерное представление можно включить после mount с согласованным placeholder. suppressHydrationWarning - узкое исключение, а не синхронизация данных.

#### Пример

```jsx
const formatted = new Intl.DateTimeFormat("ru-RU", {
  timeZone: "UTC",
  dateStyle: "short",
}).format(new Date(isoDate))
```

#### Разбор примера

Обе стороны используют один isoDate, UTC и ru-RU, уменьшая зависимость результата от машинных defaults. Если нужны персональные настройки браузера, их применяют отдельным согласованным этапом. Случайная дата в первом render разрушила бы исходное совпадение.

#### Типичная ошибка

Форматировать одну дату в локальной серверной и браузерной зоне и ожидать одинаковую строку.

#### Для закрепления

- [Что такое гидратация и почему возникает hydration mismatch?](/questions/react-hydration)

#### Источники

[React: client / hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot)
