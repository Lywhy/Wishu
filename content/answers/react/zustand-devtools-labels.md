**Devtools middleware может получать имя store и подписи изменений, чтобы история была понятна при диагностике.**

<!-- wishu:answer-block -->

### Механизм и границы

- Третий аргумент поддерживаемого set задаёт описание action; сам middleware не превращает Zustand в Redux-reducer-модель.

- Не логируйте секреты и учитывайте конфигурацию production. Динамические экземпляры могут требовать очистки подключения DevTools.

### Пример

```jsx
set({ count: get().count + 1 }, false, "counter/increment")
// Creator обёрнут в devtools(..., { name: 'counter' }).
```

### Типичная ошибка

Считать технические имена вроде anonymous достаточными для разбора сложного workflow.

### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

### Источник

[Zustand: devtools](https://zustand.docs.pmnd.rs/reference/middlewares/devtools)
