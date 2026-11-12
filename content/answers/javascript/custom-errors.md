**Для обычной ошибки достаточно `new` Error(message); для узнаваемого доменного типа создают class extends Error, вызывают super и добавляют необходимые поля.**

<!-- wishu:answer-block -->

### Как это работает

Name удобно задавать явно, а машинный code должен быть отдельным договорённым полем, а не результатом разбора message. Опция cause сохраняет исходную причину при добавлении контекста.

Это лучше, чем безусловно выбрасывать новый Error и терять связь. В одном realm `instanceof` помогает различить подклассы; между realm и при сериализации нужна отдельная осторожность.

Не следует помещать секреты в сообщения, предназначенные для журнала или пользователя.

### Пример и его разбор

```javascript
class ValidationError extends Error {
  constructor(message, field, options) {
    super(message, options)
    this.name = "ValidationError"
    this.field = field
  }
}
const issue = new ValidationError("Обязательное поле", "email")
issue instanceof Error // true
```

ValidationError сохраняет стандартное поведение Error через super и добавляет предметное поле field. Вызывающий код может связать проблему с конкретным контролом формы. При оборачивании чужого сбоя параметр options позволяет передать cause и сохранить исходную диагностическую цепочку.

### Источники

[MDN: Guide / Control flow and error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
