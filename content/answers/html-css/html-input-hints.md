Type задаёт вид и часть поведения контрола, inputmode подсказывает удобную виртуальную клавиатуру, а autocomplete обозначает назначение данных для автозаполнения. Это не три взаимозаменяемых валидатора.

<!-- wishu:answer-block -->

Номер телефона, почтовый индекс или одноразовый код часто не являются числами для вычислений: ведущий ноль и формат могут быть важны. Для строкового кода уместен text с numeric inputmode и подходящим autocomplete.

Подсказка клавиатуры не запрещает вставку других символов. Для пароля учитывайте current-password/new-password, не ломайте менеджеры паролей. Подпись и проверка формата остаются отдельными требованиями.

<!-- wishu:answer-block -->

[Документация](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input).

<!-- wishu:answer-block -->

#### Автозаполнение - помощь, а не граница доверия

`autocomplete` сообщает назначение данных, например `email`, `current-password` или `new-password`. Одного `off` недостаточно, чтобы универсально запретить менеджерам паролей все предложения: поведение зависит от браузера и контекста. Не блокируйте вставку и не используйте обманные имена полей как защиту. Подсказка не подтверждает принадлежность email и не заменяет проверку учётных данных.

```html
<label for="password">Новый пароль</label>
<input id="password" name="password" type="password" autocomplete="new-password" />
```

- [Как связать ошибку формы с полем и когда использовать aria-invalid?](/questions/html-form-error-experience)

[MDN: autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete).
