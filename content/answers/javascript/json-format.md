**JSON - текстовый формат для объектов, массивов, строк, чисел, boolean и `null`.**

<!-- wishu:answer-block -->

### Как это работает

Имена свойств и строки записываются в двойных кавычках; комментарии, trailing comma, `undefined` и функции в JSON недопустимы. `JSON.parse` читает текст, `JSON.stringify` создаёт JSON-текст из поддерживаемых значений.

Сериализация может терять информацию: свойства со значениями `undefined`, function и `Symbol` пропускаются, а такие элементы массива становятся `null`. `NaN` и бесконечности превращаются в `null`. `BigInt` и циклические ссылки по умолчанию вызывают ошибку; Date обычно превращается в строку через toJSON. Поэтому JSON не универсальный способ глубокого копирования.

### Пример и его разбор

```javascript
const text = JSON.stringify({ name: "Аня", active: true })
const user = JSON.parse(text)
user.name // "Аня"
JSON.stringify({ value: undefined }) // "{}"
JSON.stringify([undefined, NaN]) // "[null,null]"
```

Первое преобразование сохраняет поддерживаемые свойства в текстовом формате, а `JSON.parse` создаёт из текста новый объект. Следующие строки показывают потерю информации: `undefined` исчезает из объекта, но занимает место `null` внутри массива. Поэтому успешная сериализация не доказывает, что сохранены все свойства исходного значения, его прототип и поведение.

### Источники

[MDN: Global Objects / JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
