**Браузер может неявно отправить форму при Enter в подходящем поле.** Поэтому обработка только click одной кнопки не покрывает весь сценарий.

<!-- wishu:answer-block -->

#### Как это работает

- При наличии подходящей default submit-кнопки может происходить её активация. Точное поведение зависит от структуры формы и типа контрола; Enter внутри `textarea` обычно вводит перевод строки.
- Основной обработчик отправки размещают на form submit. У вспомогательных кнопок явно задают `type="button"`, чтобы не создать случайный submit.
- При своей асинхронной отправке отменяйте действие своевременно в submit-обработчике, а не после await. Проверка ограничений может не допустить submit-событие при невалидных данных.
- Не блокируйте Enter у всех полей без причины: это ухудшает привычный клавиатурный сценарий.

#### Пример

```html
<form action="/search">
  <label for="term">Поиск</label>
  <input id="term" name="q" />
  <button type="button">Очистить фильтры</button>
  <button type="submit">Найти</button>
</form>
```

#### Для закрепления

- [Чем stopPropagation отличается от preventDefault и как отменить отправку формы?](/questions/event-cancellation)
- [Что проверяет встроенная валидация формы и где нужны собственные проверки?](/questions/html-native-validation)

#### Источник

[WHATWG HTML: form-control-infrastructure.html](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#implicit-submission).
