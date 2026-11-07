**Indeterminate показывает смешанное состояние, например частичный выбор группы.** Это DOM-свойство нативного checkbox, а не третье отправляемое значение его `checked`.

<!-- wishu:answer-block -->

#### Как это работает

- Состояние устанавливают программно через свойство `indeterminate`. Обычного HTML-атрибута, эквивалентного этому свойству, нет.
- Для данных формы важен `checked`: один `indeterminate` не добавляет и не убирает запись. Родительский «Выбрать всё» должен вычисляться из состояния дочерних контролов.
- Нативная активация может сбросить `indeterminate`; приложение согласует его после изменения модели. Для самодельного checkbox потребуется ещё и полный ARIA/keyboard-контракт.

#### Пример

```javascript
const all = document.querySelector("#select-all")
all.checked = false
all.indeterminate = true
// Показывает частичный выбор; само по себе не выбирает дочерние пункты.
```

#### Для закрепления

- [Какие поля попадают в данные формы и почему disabled отличается от readonly?](/questions/html-form-entry-list)

#### Источник

[MDN: checkbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/checkbox#indeterminate_state_checkboxes).
