**Обработчик `onSubmit` охватывает отправку кнопкой и клавишей Enter.** Если отправку выполняет клиентский код, `preventDefault` отменяет стандартную навигацию. `FormData` собирает успешные элементы формы по name; отключённые и неотмеченные checkbox в набор не входят.

<!-- wishu:answer-block -->

#### Как это работает

Кнопке вспомогательного действия внутри формы нужен type="button", иначе она может отправить форму. В React 19 функция action получает `FormData` и предоставляет другой способ описать отправку; необязательно одновременно дублировать эту же операцию в onSubmit.

#### React 19 action

После успешного выполнения функции action React сбрасывает неуправляемые поля формы. Controlled-поля остаются под властью вашего state, их политика сброса должна быть задана отдельно. Не стирайте введённые данные до подтверждения успешной операции. Согласуйте отправку клавишей Enter, явный submitter, блокировку повторного действия и доступное сообщение результата.

#### Пример

```tsx
function SearchForm() {
  function submit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log(data.get("query"))
  }
  return (
    <form onSubmit={submit}>
      <input name="query" />
      <button type="submit">Найти</button>
    </form>
  )
}
```

#### Разбор примера

Submit читает текущую форму, поэтому query собирается по name независимо от способа отправки. `preventDefault` оставляет обработку клиентскому коду. Если убрать name, поле останется видимым, но `FormData` не получит ожидаемый ключ.

#### Типичная ошибка

> Обрабатывать отправку только через `onClick` кнопки и пропустить Enter, клавиатуру или другой submitter.

#### Источники

[React: components / form](https://react.dev/reference/react-dom/components/form)
