**Выбранные файлы получают из input.files или `FormData`.** Браузер не позволяет задавать произвольный локальный путь и выбирать файл от имени пользователя через обычное строковое value.

<!-- wishu:answer-block -->

### Как это работает

- Из `FileList` можно получить массив File и проверить размер или тип для быстрой обратной связи.

- accept и клиентская проверка помогают пользователю, но сервер всё равно обязан проверить файл и права на операцию.

- Повторный выбор того же файла может потребовать сброса input. Не сохраняйте выдуманный путь как содержимое файла; для загрузки передавайте сам File. Для временных object URL отдельно нужен revokeObjectURL.

### Пример

```jsx
function Upload() {
  return (
    <input
      type="file"
      accept="image/*"
      onChange={(event) => {
        const file = event.target.files?.[0]
        if (file) console.log(file.name, file.size)
      }}
    />
  )
}
```

### Типичная ошибка

Привязать value к имени файла и считать эту строку выбранным содержимым или надёжной серверной валидацией.

### Источники

- [React: components / input](https://react.dev/reference/react-dom/components/input)

- [MDN: input / file](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file)
