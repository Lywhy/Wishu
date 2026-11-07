**ARIA описывает состояние и отношения, но не исполняет действие.** `aria-disabled="true"` не запрещает click, а `aria-expanded="false"` не прячет содержимое.

<!-- wishu:answer-block -->

#### Механизм и границы

- Предпочитайте нативный `disabled`, если нужен именно его контракт. Иногда недоступное действие намеренно оставляют в Tab-порядке для обнаружения: тогда `aria-disabled` требует запрета активации всеми способами.
- У раскрытия состояние `aria-expanded` должно совпадать с реальной видимостью, `aria-controls` указывает ID управляемого элемента. Эти атрибуты не заменяют переключение hidden и обработку кнопки.
- Не ставьте `aria-hidden` на фокусируемый контрол. Различайте отсутствие доступности, запрет действий и визуальное скрытие.

#### Пример

```html
<button type="button" aria-expanded="false" aria-controls="explanation">Показать объяснение</button>
<div id="explanation" hidden>Подробности ответа</div>
<!-- Обработчик должен согласованно менять expanded и hidden. -->
```

#### Для закрепления

- [Почему для действия лучше использовать button, а не div?](/questions/semantic-button)
- [Чем различаются display: none, visibility, opacity, aria-hidden и inert?](/questions/html-hiding-contract)

#### Источник

[MDN: aria-disabled](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-disabled).
