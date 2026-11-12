**Тип события React параметризуется элементом обработчика; `currentTarget` получает его конкретный DOM-тип.**

<!-- wishu:answer-block -->

#### Как это работает

Для input нужен доступ к value, для checkbox - checked; у button другой набор свойств. Удобно вывести тип обработчика из JSX либо использовать ChangeEvent`<HTMLInputElement>`. Не подменяйте React-событие нативным Event без анализа API.

#### Пример

```tsx
function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  console.log(event.currentTarget.value)
}
```

#### Разбор примера

Параметр HTMLInputElement уточняет `currentTarget` и делает доступным value без any. Для checkbox нужно читать checked по его смыслу. Нативный Event и React.ChangeEvent имеют разные контракты, поэтому их нельзя заменять только ради похожего имени.

#### Типичная ошибка

Приводить target к any и скрывать несоответствие элемента обработчику.

#### Для закрепления

- [Что такое JSX и чем он отличается от HTML?](/questions/react-jsx)

#### Источники

[React: typescript](https://react.dev/learn/typescript)
