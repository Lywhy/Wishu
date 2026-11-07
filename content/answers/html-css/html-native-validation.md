Required, type, pattern и числовые ограничения задают часть клиентских правил. checkValidity проверяет ограничения, reportValidity также запрашивает показ сообщений, а setCustomValidity задаёт прикладное сообщение об ошибке.

<!-- wishu:answer-block -->

Непустое custom-сообщение удерживает поле в ошибочном состоянии: его нужно сбросить после исправления. Клиентские проверки улучшают ввод, но не подтверждают уникальность записи, права доступа и доверенность запроса.

RequestSubmit воспроизводит обычную отправку с соответствующей проверкой и submit-событием, в отличие от прямого form.submit. Предоставьте доступные инструкции и сообщения; не сообщайте об ошибке одним красным цветом.

<!-- wishu:answer-block -->

[Документация](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation).

<!-- wishu:answer-block -->

#### Проверка, отправка и выбранная кнопка

Для программного продолжения обычного сценария формы используют requestSubmit с нужной submit-кнопкой: учитываются проверка и submit-событие, если проверка позволяет отправку. Form.submit обходит эти стадии и не воспроизводит активацию кнопки. Кнопка с formnovalidate и форма с novalidate осознанно меняют поведение проверки. Поле name="submit" может затенить метод формы, поэтому избегайте коллизий имён.

```javascript
const form = document.querySelector("form")
const saveButton = form.querySelector("button[type=submit]")
form.requestSubmit(saveButton)
// При невалидных полях обычная отправка не продолжается.
```

- [Как action, method, enctype и submit-кнопка определяют отправку формы?](/questions/html-native-submit-contract)
- [Как связать ошибку формы с полем и когда использовать aria-invalid?](/questions/html-form-error-experience)

[MDN: requestSubmit](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/requestSubmit).
