**Размерный запрос выбирает подходящий контейнер среди предков целевого элемента.** Элемент не измеряет сам себя этим же запросом: это помогает избежать циклического изменения размера.

<!-- wishu:answer-block -->

#### Механизм и границы

- `container-type`: `inline-size` создаёт размерный контейнер по inline-оси. Его назначают обёртке, а правила внутри `@container` применяют к содержимому.
- `container-name` позволяет выбрать нужного предка, а не случайный ближайший контейнер. Имя не делает элемент подходящим без нужного типа containment.
- Size containment влияет на расчёт размеров: `container-type` не стоит бездумно добавлять каждому блоку. Убедитесь, что внешняя раскладка задаёт контейнеру устойчивую доступную ширину.
- `cqi` зависит от inline-размера подходящего контейнера; без подходящего контейнера действуют правила fallback к малому viewport, а не просто ширина любого родителя.

#### Пример

```css
.slot {
  container: lesson / inline-size;
}
.card {
  display: grid;
  gap: 1rem;
}
@container lesson (inline-size > 35rem) {
  .card {
    grid-template-columns: 12rem 1fr;
  }
}
/* .card находится внутри .slot. */
```

#### Для закрепления

- [Чем media query отличается от container query?](/questions/css-media-container)

#### Источник

[MDN: Container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries).
