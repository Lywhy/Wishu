**Overscroll-behavior управляет поведением на границе прокрутки, включая передачу жеста внешнему контейнеру.** Оно не создаёт scroll-контейнер и не заменяет модальный контракт.

<!-- wishu:answer-block -->

#### Как это работает

- Contain ограничивает scroll chaining, сохраняя некоторые локальные эффекты границы. None дополнительно подавляет такие эффекты по правилам браузера.
- Свойство нужно реальному скроллируемому контейнеру с ограниченным размером и `overflow`. Обычный растущий `div` не станет панелью прокрутки.
- Независимое взаимодействие с фоном модального окна решается отдельно. Overscroll-behavior не блокирует Tab и не делает фон inert.
- Проверьте колесо, touch и доступ к содержимому. Не создавайте панель, в которой пользователь теряет управление прокруткой.

#### Пример

```css
.results {
  max-block-size: 24rem;
  overflow-y: auto;
  overscroll-behavior-y: contain;
}
```

#### Для закрепления

- [Как сделать прокрутку только у центральной панели в Flexbox?](/questions/css-bounded-scroll-pane)
- [Чем showModal() у dialog отличается от простого показа блока?](/questions/html-native-dialog)

#### Источник

[MDN: overscroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overscroll-behavior).
