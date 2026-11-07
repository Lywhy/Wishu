Обычные custom properties участвуют в каскаде и обычно наследуются. Var(--name, fallback) использует запасное значение при отсутствии подходящего значения переменной, но не является универсальной проверкой пригодности результата для конкретного свойства.

<!-- wishu:answer-block -->

Если переменная определена как 12px, подстановка в color не превратится автоматически в fallback red: после подстановки декларация color может стать недопустимой на стадии вычисления.

Переменные удобны для токенов темы и локальных настроек компонента. @property позволяет задать синтаксис, наследование и initial-value для зарегистрированного свойства. Это отличается от переменной препроцессора, заменяемой во время сборки.

<!-- wishu:answer-block -->

[Документация](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties).

<!-- wishu:answer-block -->

#### Fallback не является проверкой типа подставленной строки

В примере --accent существует, поэтому fallback red не выбирается. Значение 12px непригодно для color уже после подстановки. Победившая декларация становится invalid at computed-value time: предыдущая color: blue не восстанавливается простым возвратом по каскаду; срабатывают правила наследования/initial. Для типизированного контракта custom property есть отдельная регистрация @property.

```css
.card {
  --accent: 12px;
  color: blue;
  color: var(--accent, red);
}
```

- [Что меняет регистрация custom property через @property?](/questions/css-registered-property)
- [Как браузер обрабатывает неизвестное свойство, неверное значение и ошибку в селекторе?](/questions/css-error-recovery)

[Документация](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties).
