**Для select и textarea текущим значением управляет value, а начальным - `defaultValue`.** При select с multiple управляемое значение является массивом выбранных строк.

<!-- wishu:answer-block -->

### Как это работает

- В React выбранный option задают через value родительского select, а не отдельный selected на option.

- Для textarea используйте value/`defaultValue`, а не дочерний текст как способ задания начального содержимого.

- `onChange` должен обновить управляемое значение. Для multiple извлеките значения `selectedOptions`, поскольку target.value представляет только одну строку, а не весь набор.

### Пример

```jsx
function TagsField() {
  const [tags, setTags] = useState(["react"])
  return (
    <label>
      Темы
      <select
        multiple
        value={tags}
        onChange={(event) => {
          setTags(Array.from(event.target.selectedOptions, (option) => option.value))
        }}
      >
        <option value="react">React</option>
        <option value="typescript">TypeScript</option>
      </select>
    </label>
  )
}
```

### Типичная ошибка

Ожидать, что изменение `defaultValue` после mount будет управлять уже отредактированным полем.

### Источники

- [React: components / select](https://react.dev/reference/react-dom/components/select)

- [React: components / textarea](https://react.dev/reference/react-dom/components/textarea)
