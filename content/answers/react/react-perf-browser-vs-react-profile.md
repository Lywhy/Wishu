**React Profiler показывает работу дерева React, а браузерный Performance позволяет увидеть JS, layout, paint, сеть и длинные задачи вместе.**

<!-- wishu:answer-block -->

### Механизм и границы

- Сначала воспроизведите одно медленное действие и определите доминирующую фазу.

- Дешёвый render не исправит огромный layout, а уменьшение сетевого waterfall не обязано снизить actualDuration. Сравнивайте повторные замеры в одинаковых условиях.

### Пример

```jsx
<Profiler id="results" onRender={recordRender}>
  <Results />
</Profiler>
// Параллельно анализируют ту же операцию в Performance браузера.
```

### Типичная ошибка

Оптимизировать props при задержке, вызванной изображением или синхронным layout стороннего виджета.

### Для закрепления

- [Как найти причину медленного взаимодействия в React?](/questions/react-profiler)

### Источник

[React: react / Profiler](https://react.dev/reference/react/Profiler)
