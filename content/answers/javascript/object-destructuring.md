**Объектный шаблон извлекает свойства по именам, а не по позиции.**

<!-- wishu:answer-block -->

### Как это работает

Запись { name: displayName } создаёт переменную displayName, а не name. Значение по умолчанию используется только при `undefined`, включая отсутствующее свойство; `null` сохраняется.

Вложенный шаблон требует существующего подходящего значения, поэтому для отсутствующего промежуточного объекта можно задать default. Rest собирает оставшиеся собственные перечисляемые свойства в новый объект; вложенные объекты не клонируются.

Деструктуризация `null` или `undefined` без подходящей внешней защиты вызывает ошибку.

### Пример и его разбор

```javascript
const user = { name: "Аня", role: undefined, profile: undefined }
const { name: displayName, role = "reader", profile: { city = "-" } = {} } = user
displayName // "Аня"
role // "reader"
city // "-"
const { name, ...other } = user
Object.hasOwn(other, "name") // false
```

Шаблон связывает name с новой переменной displayName, а отсутствующий role заменяет значением по умолчанию. Дополнительный default для profile позволяет безопасно применить вложенный шаблон к undefined. Rest собирает остальные поля в отдельный внешний объект, но не делает глубокую копию их значений.

### Источники

[MDN: Guide / Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)
