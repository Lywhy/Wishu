**readOnly запрещает редактирование поддерживаемого поля, а disabled отключает контрол и обычно исключает его из отправки формы.**

<!-- wishu:answer-block -->

### Механизм и границы

- Read-only текстовое поле обычно остаётся доступным для фокуса и копирования.

- readOnly подходит не всем контролам: для select нужен другой контракт. Заблокированный UI не запрещает ручной вызов API.

### Пример

```jsx
<>
  <input name="id" value={id} readOnly />
  <input name="draft" value={draft} disabled />
</>
// В FormData id может присутствовать, disabled draft - нет.
```

### Типичная ошибка

Ожидать, что disabled-поле будет отправлено как обычное значение формы.

### Для закрепления

- [Чем управляемое поле отличается от неуправляемого?](/questions/react-controlled-input)

### Источник

[React: components / input](https://react.dev/reference/react-dom/components/input)
