**Атрибут - значение в разметке, доступное через getAttribute и setAttribute, обычно в строковой форме.**

<!-- wishu:answer-block -->

### Как это работает

Свойство - поле DOM-объекта с поведением и типом конкретного интерфейса. Многие свойства отражают атрибуты, но соответствие не всегда прямое.

У checkbox атрибут checked задаёт состояние по умолчанию, а свойство checked - текущее состояние. Наличие boolean-атрибута означает `true` даже при тексте "`false`".

У input value и defaultValue тоже различаются текущее и исходное значения. Нужно выбирать нужный слой состояния, а не заменять любое свойство setAttribute.

### Пример и его разбор

```javascript
const input = document.createElement("input")
input.type = "checkbox"
input.setAttribute("checked", "false")
input.defaultChecked // true: атрибут присутствует
input.checked = false
input.hasAttribute("checked") // true
input.checked // false: текущее состояние
```

Значение атрибута «`false`» не выключает checked: для boolean-атрибута важно его присутствие. Затем присваивание свойству меняет текущее состояние, не удаляя исходный атрибут. Поэтому проверка наличия атрибута не отвечает на вопрос, отмечен ли checkbox сейчас.

### Источники

[MDN: API / Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
