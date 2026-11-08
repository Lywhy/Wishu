**Компонент-обёртка должен явно определить, какие props он обрабатывает сам и какие передаёт дальше.** Порядок spread определяет, чьё значение победит при совпадении имени.

<!-- wishu:answer-block -->

### Как это работает

- Извлекайте внутренние параметры до передачи остатка в DOM. Например, tone может описывать дизайн, но не быть атрибутом button.

- Если обёртка добавляет поведение к `onClick`, вызывайте переданный обработчик явно. Два `onClick` не объединяются автоматически; договоритесь, отменяет ли `preventDefault` внутреннее действие.

- Не теряйте type, disabled, aria-* и data-* атрибуты. Для кнопки внутри формы отсутствие type может означать submit. Контракт ref зависит от версии React и реализации компонента.

### Пример

```jsx
function SaveButton({ onClick, ...props }) {
  return (
    <button
      {...props}
      type="button"
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) console.log("Сохранить")
      }}
    >
      Сохранить
    </button>
  )
}
```

### Типичная ошибка

Поставить `{...props}` после обязательного `onClick` и незаметно разрешить его полное переопределение.

### Источники

- [React: learn / passing-props-to-a-component](https://react.dev/learn/passing-props-to-a-component)
