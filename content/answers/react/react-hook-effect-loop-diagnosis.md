**Для цикла обычно нужны два звена: эффект обновляет state, а обновление меняет его зависимость или запускает его снова.**

<!-- wishu:answer-block -->

### Механизм и границы

- Сначала проверьте, есть ли вообще внешняя система. Производное значение часто нужно вычислить прямо в render.

- Затем найдите изменяющуюся зависимость: новый объект, функция или сам изменяемый state. Устраните причину, а не поставьте [] с устаревшими значениями.

### Пример

```jsx
// Лишний цикл синхронизации:
// useEffect(() => setFiltered(items.filter(matches)), [items, matches])
const filtered = items.filter(matches)
```

### Типичная ошибка

Заглушить exhaustive-deps, не разобрав вторую половину цикла.

### Для закрепления

- [Для чего нужен useEffect и его cleanup?](/questions/effects)

- [Когда useEffect не нужен и чем его заменить?](/questions/react-effect-not-needed)

### Источник

[React: react / useEffect](https://react.dev/reference/react/useEffect)
