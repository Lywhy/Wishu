**Visually hidden-паттерн оставляет текст в дереве доступности, но убирает его обычное визуальное представление.** Display: `none`, hidden и `aria-hidden` решают другую задачу.

<!-- wishu:answer-block -->

#### Как это работает

- Это полезно для дополнительной подписи иконки или заголовка области, когда видимой подписи обоснованно нет.
- Используйте согласованный небольшой паттерн с ограничением коробки и обрезанием. Один opacity: 0 оставит невидимую область и возможное взаимодействие.
- Не прячьте фокусируемые действия постоянно. Skip link должна раскрываться при фокусе; для обычного скрытого текста не нужно добавлять `tabindex`.
- Предпочитайте понятный видимый текст, если пространство позволяет: скрытая подпись не помогает всем зрячим пользователям.

#### Пример

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
```

#### Для закрепления

- [Чем различаются display: none, visibility, opacity, aria-hidden и inert?](/questions/html-hiding-contract)
- [Зачем нужна ссылка «К основному содержимому» и как она должна работать?](/questions/html-skip-navigation)

#### Источник

[W3C WAI: labels](https://www.w3.org/WAI/tutorials/forms/labels/#hiding-label-text).
