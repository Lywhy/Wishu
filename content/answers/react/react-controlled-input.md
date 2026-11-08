**Управляемый input получает текущее value или checked от React; неуправляемый хранит текущее значение в DOM.** `defaultValue`/`defaultChecked` задают начальное значение, а не постоянную синхронизацию.

<!-- wishu:answer-block -->

### Как это работает

- Для строки начальным управляемым значением обычно служит "", а не undefined или null. Не переключайте один живой input между режимами.

- В `onChange` синхронно сохраните новое значение управляемого поля. Если передан value без обработчика, поле нужно явно считать readOnly либо добавить изменение state.

- Checkbox и radio управляются checked. Их value - передаваемое значение, а не признак включения.

- Неуправляемую форму удобно читать через `FormData`. Файловый input имеет отдельные браузерные ограничения; его нельзя контролировать как строковый путь.

- Для повторно используемого контрола заранее выберите владельца текущего значения. Слепое копирование value в независимый state создаёт конфликт источников истины.

### Пример

```jsx
function NotificationsField() {
  const [enabled, setEnabled] = useState(false)
  return (
    <label>
      <input
        type="checkbox"
        checked={enabled}
        onChange={(event) => setEnabled(event.target.checked)}
      />
      Получать уведомления
    </label>
  )
}
```

### Типичная ошибка

Читать event.target.value вместо checked у checkbox или ожидать, что новый `defaultValue` обновит отредактированное поле.

### Источники

- [React: components / input](https://react.dev/reference/react-dom/components/input)
