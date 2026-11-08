**Составной компонент разделяет общий контракт на Root и связанные части, которые получают состояние через Context.**

<!-- wishu:answer-block -->

### Механизм и границы

- Например, TabsRoot хранит выбранный tab, а Trigger и Panel используют согласованный ID. Части должны обнаруживать отсутствие Root и поддерживать доступную клавиатурную модель.

- Context не создаёт ARIA и обработчики автоматически. Для обычного продукта часто правильнее использовать готовую доступную библиотеку и расширять её контракт.

### Пример

```jsx
<TabsRoot value={tab} onValueChange={setTab}>
  <TabsTrigger value="code">Код</TabsTrigger>
  <TabsPanel value="code">...</TabsPanel>
</TabsRoot>
```

### Типичная ошибка

Считать набор компонентов составным API только из-за одинакового префикса, не согласовав состояние и идентичность.

### Для закрепления

- [Что такое JSX и чем он отличается от HTML?](/questions/react-jsx)

- [Как выбрать между children, render prop, HOC и пользовательским хуком?](/questions/react-composition-patterns)

### Источник

[React: passing-data-deeply-with-context](https://react.dev/learn/passing-data-deeply-with-context)
