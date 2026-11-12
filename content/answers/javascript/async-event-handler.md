**Обработчик можно объявить `async`, но DOM-диспетчер не ожидает его `Promise` перед продолжением доставки события и действием по умолчанию.**

<!-- wishu:answer-block -->

### Как это работает

`preventDefault` нужно вызвать до первого await. После ожидания `currentTarget` обычно уже `null`, поэтому нужную ссылку сохраняют сразу.

Ошибка `async`-обработчика становится отклонением `Promise`, который браузерный dispatch не перехватывает за вас. Нужен собственный try/catch.

Также нужно учитывать повторные клики и то, что элемент или страница могут измениться за время ожидания. Блокировку кнопки удобно возвращать в finally.

### Пример и его разбор

```javascript
function attachSave(button, save) {
  button.addEventListener("click", async (event) => {
    const element = event.currentTarget
    element.disabled = true
    try {
      await save()
    } catch (error) {
      console.error(error)
    } finally {
      element.disabled = false
    }
  })
}
```

Ссылка на кнопку сохраняется до `await`, затем `finally` снимает блокировку как при успехе, так и при ошибке. `catch` нужен внутри `async`-обработчика: DOM не ожидает возвращённый Promise. В реальном экране также учитывают его закрытие за время запроса.

### Источники

[MDN: API / Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
