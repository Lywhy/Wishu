**Задайте ограниченный размер внешней раскладке и разрешите центральной части сжиматься.** Одного `overflow`: auto недостаточно, если панель бесконечно растёт по содержимому.

<!-- wishu:answer-block -->

#### Как это работает

- У вертикального flex-контейнера центральной панели часто нужны `flex`: 1 и `min-block-size`: 0. Автоматический минимум иначе может вытолкнуть прокрутку на страницу.
- Шапка остаётся обычной частью потока; прокрутка назначается конкретной панели. Все промежуточные обёртки должны сохранять нужные ограничения.
- Проверьте клавиатурный доступ к содержимому и отсутствие вложенных scroll-ловушек. Такой шаблон подходит для рабочей панели, но не обязательно нужен каждой странице.

#### Пример

```css
.workspace {
  block-size: 100dvh;
  display: flex;
  flex-direction: column;
}
.workspace > header {
  flex: none;
}
.workspace > main {
  flex: 1;
  min-block-size: 0;
  overflow: auto;
}
```

#### Для закрепления

- [Почему flex-элемент не сжимается и ломает макет?](/questions/css-flex-min-size)
- [Чем overflow: hidden отличается от clip, auto и scroll?](/questions/css-overflow-scroll-contract)

#### Источник

[MDN: Basic concepts](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts).
